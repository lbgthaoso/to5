/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SyncStatusInfo {
  isOnline: boolean;
  syncState: 'idle' | 'syncing' | 'saved' | 'error';
  lastSavedAt: string | null;
  lastSavedByEmail: string | null;
  lastSavedByName: string | null;
  revision: number;
  message?: string;
}

export interface SharedSyncPayload {
  settings?: any;
  leader_pass?: string;
  members?: any[];
  reports?: any[];
  struggling?: any[];
  team_docs?: any[];
  exams?: any[];
  lesson_studies?: any[];
  directives?: any[];
  meetings?: any[];
  emulations?: any[];
  emulation_docs?: any[];
  timetables?: any[];
}

const STORAGE_EMAIL_KEY = 'tanthanh_k5_active_email';
const STORAGE_LAST_REVISION_KEY = 'tanthanh_k5_last_revision';

export function getActiveUserEmail(defaultEmail = 'lbgthaoso@gmail.com'): string {
  if (typeof window === 'undefined') return defaultEmail;
  return localStorage.getItem(STORAGE_EMAIL_KEY) || defaultEmail;
}

export function setActiveUserEmail(email: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_EMAIL_KEY, email.trim());
  }
}

export function getLastKnownRevision(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem(STORAGE_LAST_REVISION_KEY) || '0', 10);
}

export function setLastKnownRevision(rev: number): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_LAST_REVISION_KEY, rev.toString());
  }
}

/**
 * Push local application data to server for online multi-account sharing
 */
export async function pushDataToOnlineServer(
  payload: SharedSyncPayload,
  userEmail: string,
  userName: string
): Promise<{ success: boolean; revision: number; lastUpdated: string; message: string }> {
  try {
    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: payload,
        userEmail: userEmail || getActiveUserEmail(),
        userName: userName || 'Giáo viên Khối 5',
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const result = await response.json();
    if (result.success) {
      setLastKnownRevision(result.revision);
      return {
        success: true,
        revision: result.revision,
        lastUpdated: result.lastUpdated,
        message: result.message || 'Đã lưu trữ trực tuyến thành công.',
      };
    } else {
      throw new Error(result.error || 'Đồng bộ thất bại');
    }
  } catch (err: any) {
    console.warn('[OnlineSync] pushDataToOnlineServer warning:', err);
    throw err;
  }
}

/**
 * Pull the latest shared data from server
 */
export async function pullDataFromOnlineServer(
  userEmail: string,
  userName: string
): Promise<{ success: boolean; data: SharedSyncPayload | null; metadata: any }> {
  try {
    const emailParam = encodeURIComponent(userEmail || getActiveUserEmail());
    const nameParam = encodeURIComponent(userName || 'Giáo viên Khối 5');
    const response = await fetch(`/api/sync?email=${emailParam}&name=${nameParam}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Server HTTP error: ${response.status}`);
    }

    const result = await response.json();
    if (result.success) {
      if (result.metadata?.revision) {
        setLastKnownRevision(result.metadata.revision);
      }
      return {
        success: true,
        data: result.data || null,
        metadata: result.metadata,
      };
    } else {
      throw new Error(result.error || 'Không thể tải dữ liệu trực tuyến');
    }
  } catch (err: any) {
    console.warn('[OnlineSync] pullDataFromOnlineServer warning:', err);
    throw err;
  }
}

/**
 * Check if the server has newer updates from other shared accounts
 */
export async function checkServerSyncStatus(): Promise<{
  success: boolean;
  revision: number;
  lastUpdated: string | null;
  lastUpdatedByEmail: string;
  lastUpdatedByName: string;
  hasData: boolean;
}> {
  try {
    const response = await fetch('/api/sync/status', {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (!response.ok) throw new Error('Status HTTP error');
    return await response.json();
  } catch (err) {
    return {
      success: false,
      revision: 0,
      lastUpdated: null,
      lastUpdatedByEmail: '',
      lastUpdatedByName: '',
      hasData: false,
    };
  }
}

/**
 * Auto-save before browser unload or visibility change
 */
export function sendBeaconSync(payload: SharedSyncPayload, userEmail: string, userName: string): boolean {
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    try {
      const blob = new Blob(
        [
          JSON.stringify({
            data: payload,
            userEmail,
            userName,
          }),
        ],
        { type: 'application/json' }
      );
      return navigator.sendBeacon('/api/sync', blob);
    } catch {
      return false;
    }
  }
  return false;
}
