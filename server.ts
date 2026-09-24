import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data_storage');
const SHARED_DATA_FILE = path.join(DATA_DIR, 'shared_online_data.json');

// Ensure storage folder exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create data_storage dir:', err);
  }
}

interface SyncMetadata {
  lastUpdated: string;
  lastUpdatedByEmail: string;
  lastUpdatedByName: string;
  revision: number;
  activeAccounts: Array<{ email: string; name: string; lastSeen: string }>;
}

interface SharedStore {
  metadata: SyncMetadata;
  data: Record<string, any>;
}

function getInitialStore(): SharedStore {
  return {
    metadata: {
      lastUpdated: new Date().toISOString(),
      lastUpdatedByEmail: 'lbgthaoso@gmail.com',
      lastUpdatedByName: 'Tổ trưởng Nguyễn Thị Bé Tý',
      revision: 1,
      activeAccounts: [
        {
          email: 'lbgthaoso@gmail.com',
          name: 'Quản trị viên / Tổ trưởng',
          lastSeen: new Date().toISOString()
        }
      ]
    },
    data: {}
  };
}

function readSharedStore(): SharedStore {
  if (fs.existsSync(SHARED_DATA_FILE)) {
    try {
      const raw = fs.readFileSync(SHARED_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed as SharedStore;
      }
    } catch (err) {
      console.error('Error reading shared_online_data.json:', err);
    }
  }
  return getInitialStore();
}

function saveSharedStore(store: SharedStore): boolean {
  try {
    fs.writeFileSync(SHARED_DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing shared_online_data.json:', err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  // Increase payload limit for uploaded documents (Word, Excel, Images, Lesson plans)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // --- REST API FOR ONLINE MULTI-ACCOUNT SYNCHRONIZATION ---

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', online: true, serverTime: new Date().toISOString() });
  });

  // Check sync status (revision & last update info) - lightweight
  app.get('/api/sync/status', (_req, res) => {
    const store = readSharedStore();
    res.json({
      success: true,
      revision: store.metadata?.revision || 0,
      lastUpdated: store.metadata?.lastUpdated || null,
      lastUpdatedByEmail: store.metadata?.lastUpdatedByEmail || '',
      lastUpdatedByName: store.metadata?.lastUpdatedByName || '',
      activeAccountsCount: store.metadata?.activeAccounts?.length || 0,
      hasData: Object.keys(store.data || {}).length > 0
    });
  });

  // Pull all synchronized data across shared email accounts
  app.get('/api/sync', (req, res) => {
    const clientEmail = (req.query.email as string) || '';
    const clientName = (req.query.name as string) || '';
    const store = readSharedStore();

    // Register active email if provided
    if (clientEmail) {
      let accounts = store.metadata.activeAccounts || [];
      const existingIdx = accounts.findIndex(a => a.email.toLowerCase() === clientEmail.toLowerCase());
      if (existingIdx >= 0) {
        accounts[existingIdx].lastSeen = new Date().toISOString();
        if (clientName) accounts[existingIdx].name = clientName;
      } else {
        accounts.push({
          email: clientEmail,
          name: clientName || clientEmail,
          lastSeen: new Date().toISOString()
        });
      }
      store.metadata.activeAccounts = accounts;
      saveSharedStore(store);
    }

    res.json({
      success: true,
      metadata: store.metadata,
      data: store.data
    });
  });

  // Push / Upload data to share with all email accounts
  app.post('/api/sync', (req, res) => {
    try {
      const { data, userEmail, userName } = req.body;
      if (!data || typeof data !== 'object') {
        res.status(400).json({ success: false, error: 'Dữ liệu không hợp lệ' });
        return;
      }

      const store = readSharedStore();
      const newRevision = (store.metadata.revision || 0) + 1;
      const now = new Date().toISOString();
      const authorEmail = userEmail || 'lbgthaoso@gmail.com';
      const authorName = userName || 'Giáo viên Khối 5';

      // Merge data
      store.data = {
        ...store.data,
        ...data
      };

      // Track active account
      let accounts = store.metadata.activeAccounts || [];
      const existingIdx = accounts.findIndex(a => a.email.toLowerCase() === authorEmail.toLowerCase());
      if (existingIdx >= 0) {
        accounts[existingIdx].lastSeen = now;
        accounts[existingIdx].name = authorName;
      } else {
        accounts.push({
          email: authorEmail,
          name: authorName,
          lastSeen: now
        });
      }

      store.metadata = {
        revision: newRevision,
        lastUpdated: now,
        lastUpdatedByEmail: authorEmail,
        lastUpdatedByName: authorName,
        activeAccounts: accounts
      };

      const saved = saveSharedStore(store);
      if (!saved) {
        res.status(500).json({ success: false, error: 'Không thể lưu trữ dữ liệu trên máy chủ' });
        return;
      }

      res.json({
        success: true,
        revision: newRevision,
        lastUpdated: now,
        lastUpdatedByEmail: authorEmail,
        lastUpdatedByName: authorName,
        message: 'Đã lưu trữ và ghi nhớ trực tuyến thành công cho mọi tài khoản email!'
      });
    } catch (err: any) {
      console.error('Error in /api/sync POST:', err);
      res.status(500).json({ success: false, error: err.message || 'Lỗi xử lý đồng bộ' });
    }
  });

  // Reset shared data
  app.post('/api/sync/reset', (_req, res) => {
    try {
      const initial = getInitialStore();
      saveSharedStore(initial);
      res.json({ success: true, message: 'Đã khôi phục dữ liệu trực tuyến về ban đầu' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Root redirect to /to5/ (matching Vite base: '/to5/')
  app.get('/', (_req, res) => {
    res.redirect('/to5/');
  });

  // Vite integration
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use('/to5', express.static(distPath));
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Online Shared Server] running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
