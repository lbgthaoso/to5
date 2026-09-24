/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  TeacherMember, 
  MonthlyReport, 
  StrugglingStudent, 
  TeamPlanDocument, 
  ExamAndLessonPlan, 
  LessonStudyTopic, 
  LessonStudyFeedback,
  SchoolDirective, 
  MeetingNotice,
  EmulationRecord,
  EmulationDocument,
  ClassTimetable
} from './types';
import { 
  INITIAL_MEMBERS, 
  INITIAL_MONTHLY_REPORTS, 
  INITIAL_STRUGGLING_STUDENTS, 
  INITIAL_TEAM_DOCUMENTS, 
  INITIAL_EXAMS_AND_PLANS, 
  INITIAL_LESSON_STUDIES, 
  INITIAL_DIRECTIVES, 
  INITIAL_MEETINGS,
  INITIAL_EMULATIONS, 
  INITIAL_TIMETABLES,
  INITIAL_APP_SETTINGS 
} from './data/initialData';

import { 
  loadPersistentData, 
  savePersistentData, 
  clearAllPersistentData 
} from './utils/persistentStorage';

import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { MonthlyReportView } from './components/MonthlyReportView';
import { StrugglingStudentsView } from './components/StrugglingStudentsView';
import { TeamDocumentsView } from './components/TeamDocumentsView';
import { ExamAndLessonPlansView } from './components/ExamAndLessonPlansView';
import { LessonStudyView } from './components/LessonStudyView';
import { DirectivesView } from './components/DirectivesView';
import { MeetingNoticesView } from './components/MeetingNoticesView';
import { EmulationEvaluationView } from './components/EmulationEvaluationView';
import { ClassTimetableView } from './components/ClassTimetableView';
import { MemberManagementModal } from './components/MemberManagementModal';
import { PromptModal } from './components/PromptModal';
import { BackupRestoreModal } from './components/BackupRestoreModal';

export default function App() {
  // App Settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('tanthanh_k5_settings');
    return saved ? JSON.parse(saved) : INITIAL_APP_SETTINGS;
  });

  // Leader Secret Password (Default: Tt112233 - exclusive to Cô Nguyễn Thị Bé Tý)
  const [secretPasswordLeader, setSecretPasswordLeader] = useState<string>(() => {
    return localStorage.getItem('tanthanh_k5_leader_pass') || 'Tt112233';
  });

  // Members list (ensure Nguyễn Thị Bé Tý is Tổ trưởng, Phan Thị Mỹ Linh is 5A1(ĐC))
  const [members, setMembers] = useState<TeacherMember[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_members');
    if (!saved) return INITIAL_MEMBERS;
    try {
      const parsed: TeacherMember[] = JSON.parse(saved);
      return parsed.map(m => {
        if (m.id === 'gv-6' || m.name === 'Nguyễn Thị Bé Tý') {
          return { ...m, isLeader: true, assignedClass: 'Tổ trưởng Chuyên môn Khối 5' };
        }
        if (m.id === 'gv-1' || m.name === 'Phan Thị Mỹ Linh') {
          return { 
            ...m, 
            isLeader: false, 
            assignedClass: '5A1(ĐC)' 
          };
        }
        return m;
      });
    } catch {
      return INITIAL_MEMBERS;
    }
  });

  // Current active user (defaults to leader Cô Nguyễn Thị Bé Tý)
  const [currentUser, setCurrentUser] = useState<TeacherMember>(() => {
    return members.find(m => m.name === 'Nguyễn Thị Bé Tý' || m.isLeader) || members[0];
  });

  // Navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('reports');

  // Module data states
  const [reports, setReports] = useState<MonthlyReport[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_reports');
    return saved ? JSON.parse(saved) : INITIAL_MONTHLY_REPORTS;
  });

  const [strugglingStudents, setStrugglingStudents] = useState<StrugglingStudent[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_struggling');
    return saved ? JSON.parse(saved) : INITIAL_STRUGGLING_STUDENTS;
  });

  const [teamDocuments, setTeamDocuments] = useState<TeamPlanDocument[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_team_docs');
    return saved ? JSON.parse(saved) : INITIAL_TEAM_DOCUMENTS;
  });

  const [examsAndPlans, setExamsAndPlans] = useState<ExamAndLessonPlan[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_exams');
    return saved ? JSON.parse(saved) : INITIAL_EXAMS_AND_PLANS;
  });

  const [lessonStudies, setLessonStudies] = useState<LessonStudyTopic[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_lesson_studies');
    return saved ? JSON.parse(saved) : INITIAL_LESSON_STUDIES;
  });

  // Separated: Directives (Công văn chỉ đạo)
  const [directives, setDirectives] = useState<SchoolDirective[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_directives');
    return saved ? JSON.parse(saved) : INITIAL_DIRECTIVES;
  });

  // Separated: Meetings (Thông báo họp Zoom)
  const [meetings, setMeetings] = useState<MeetingNotice[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_meetings');
    return saved ? JSON.parse(saved) : INITIAL_MEETINGS;
  });

  // Emulation records & uploaded documents
  const [emulations, setEmulations] = useState<EmulationRecord[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_emulations');
    return saved ? JSON.parse(saved) : INITIAL_EMULATIONS;
  });

  const [emulationDocuments, setEmulationDocuments] = useState<EmulationDocument[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_emulation_docs');
    return saved ? JSON.parse(saved) : [];
  });

  // Timetables (Thời khóa biểu - only shows when teachers upload)
  const [timetables, setTimetables] = useState<ClassTimetable[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_timetables');
    return saved ? JSON.parse(saved) : INITIAL_TIMETABLES;
  });

  // Modals state
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showPromptModal, setShowPromptModal] = useState<boolean>(false);
  const [showBackupModal, setShowBackupModal] = useState<boolean>(false);

  // Asynchronously hydrate from IndexedDB on startup (long-term persistent storage)
  const reloadAllDataFromStorage = useCallback(async () => {
    try {
      const [
        savedSettings,
        savedPass,
        savedMembers,
        savedReports,
        savedStruggling,
        savedTeamDocs,
        savedExams,
        savedLessons,
        savedDirectives,
        savedMeetings,
        savedEmulations,
        savedEmuDocs,
        savedTimetables
      ] = await Promise.all([
        loadPersistentData('settings', INITIAL_APP_SETTINGS),
        loadPersistentData('leader_pass', 'Tt112233'),
        loadPersistentData('members', INITIAL_MEMBERS),
        loadPersistentData('reports', INITIAL_MONTHLY_REPORTS),
        loadPersistentData('struggling', INITIAL_STRUGGLING_STUDENTS),
        loadPersistentData('team_docs', INITIAL_TEAM_DOCUMENTS),
        loadPersistentData('exams', INITIAL_EXAMS_AND_PLANS),
        loadPersistentData('lesson_studies', INITIAL_LESSON_STUDIES),
        loadPersistentData('directives', INITIAL_DIRECTIVES),
        loadPersistentData('meetings', INITIAL_MEETINGS),
        loadPersistentData('emulations', INITIAL_EMULATIONS),
        loadPersistentData('emulation_docs', [] as EmulationDocument[]),
        loadPersistentData('timetables', INITIAL_TIMETABLES)
      ]);

      if (savedSettings) setSettings(savedSettings);
      if (savedPass) setSecretPasswordLeader(savedPass);
      if (savedMembers && savedMembers.length > 0) {
        const cleanedMembers = savedMembers.map(m => {
          if (m.id === 'gv-6' || m.name === 'Nguyễn Thị Bé Tý') {
            return { ...m, isLeader: true, assignedClass: 'Tổ trưởng Chuyên môn Khối 5' };
          }
          if (m.id === 'gv-1' || m.name === 'Phan Thị Mỹ Linh') {
            return { ...m, isLeader: false, assignedClass: '5A1(ĐC)' };
          }
          return m;
        });
        setMembers(cleanedMembers);
        const currentFound = cleanedMembers.find(m => m.name === 'Nguyễn Thị Bé Tý' || m.isLeader) || cleanedMembers[0];
        setCurrentUser(currentFound);
      }
      if (savedReports) setReports(savedReports);
      if (savedStruggling) setStrugglingStudents(savedStruggling);
      if (savedTeamDocs) setTeamDocuments(savedTeamDocs);
      if (savedExams) setExamsAndPlans(savedExams);
      if (savedLessons) setLessonStudies(savedLessons);
      if (savedDirectives) setDirectives(savedDirectives);
      if (savedMeetings) setMeetings(savedMeetings);
      if (savedEmulations) setEmulations(savedEmulations);
      if (savedEmuDocs) setEmulationDocuments(savedEmuDocs);
      if (savedTimetables) setTimetables(savedTimetables);
    } catch (err) {
      console.warn('Error loading from persistent storage, using current memory state', err);
    }
  }, []);

  useEffect(() => {
    reloadAllDataFromStorage();
  }, [reloadAllDataFromStorage]);

  // Sync to IndexedDB persistent storage whenever state changes
  useEffect(() => {
    savePersistentData('settings', settings);
  }, [settings]);

  useEffect(() => {
    savePersistentData('leader_pass', secretPasswordLeader);
  }, [secretPasswordLeader]);

  useEffect(() => {
    savePersistentData('members', members);
    const found = members.find(m => m.id === currentUser.id);
    if (found) setCurrentUser(found);
  }, [members]);

  useEffect(() => {
    savePersistentData('reports', reports);
  }, [reports]);

  useEffect(() => {
    savePersistentData('struggling', strugglingStudents);
  }, [strugglingStudents]);

  useEffect(() => {
    savePersistentData('team_docs', teamDocuments);
  }, [teamDocuments]);

  useEffect(() => {
    savePersistentData('exams', examsAndPlans);
  }, [examsAndPlans]);

  useEffect(() => {
    savePersistentData('lesson_studies', lessonStudies);
  }, [lessonStudies]);

  useEffect(() => {
    savePersistentData('directives', directives);
  }, [directives]);

  useEffect(() => {
    savePersistentData('meetings', meetings);
  }, [meetings]);

  useEffect(() => {
    savePersistentData('emulations', emulations);
  }, [emulations]);

  useEffect(() => {
    savePersistentData('emulation_docs', emulationDocuments);
  }, [emulationDocuments]);

  useEffect(() => {
    savePersistentData('timetables', timetables);
  }, [timetables]);

  // Handler functions for Thanh lệnh 1: Reports
  const handleSaveReport = (report: MonthlyReport) => {
    setReports(prev => {
      const exists = prev.some(r => r.id === report.id);
      if (exists) {
        return prev.map(r => r.id === report.id ? report : r);
      }
      return [report, ...prev];
    });
  };

  const handleDeleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  // Handler functions for Thanh lệnh 2: Struggling Students
  const handleAddStudent = (student: StrugglingStudent) => {
    setStrugglingStudents(prev => [student, ...prev]);
  };

  const handleUpdateStudent = (student: StrugglingStudent) => {
    setStrugglingStudents(prev => prev.map(s => s.id === student.id ? student : s));
  };

  const handleRemoveStudent = (id: string) => {
    setStrugglingStudents(prev => prev.filter(s => s.id !== id));
  };

  // Handler functions for Thanh lệnh 3: Team Documents
  const handleUploadDocument = (doc: TeamPlanDocument) => {
    setTeamDocuments(prev => [doc, ...prev]);
  };

  const handleDeleteDocument = (id: string) => {
    setTeamDocuments(prev => prev.filter(d => d.id !== id));
  };

  // Handler functions for Thanh lệnh 4: Exams & Plans
  const handleSaveExamItem = (item: ExamAndLessonPlan) => {
    setExamsAndPlans(prev => {
      const exists = prev.some(it => it.id === item.id);
      if (exists) {
        return prev.map(it => it.id === item.id ? item : it);
      }
      return [item, ...prev];
    });
  };

  const handleApproveExamItem = (id: string, status: 'Đã duyệt' | 'Yêu cầu chỉnh sửa', reviewNote: string) => {
    const leaderName = members.find(m => m.isLeader)?.name || 'Nguyễn Thị Bé Tý';
    setExamsAndPlans(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          reviewNote,
          reviewedBy: `Tổ trưởng ${leaderName}`,
          reviewedAt: new Date().toLocaleDateString('vi-VN')
        };
      }
      return item;
    }));
  };

  const handleDeleteExamItem = (id: string) => {
    setExamsAndPlans(prev => prev.filter(item => item.id !== id));
  };

  // Handler functions for Thanh lệnh 5: Lesson Studies
  const handleSaveTopic = (topic: LessonStudyTopic) => {
    setLessonStudies(prev => [topic, ...prev]);
  };

  const handleAddFeedback = (topicId: string, feedback: LessonStudyFeedback) => {
    setLessonStudies(prev => prev.map(t => {
      if (t.id === topicId) {
        return {
          ...t,
          feedbacks: [...(t.feedbacks || []), feedback]
        };
      }
      return t;
    }));
  };

  const handleDeleteTopic = (id: string) => {
    setLessonStudies(prev => prev.filter(t => t.id !== id));
  };

  const handleDeleteFeedback = (topicId: string, feedbackId: string) => {
    setLessonStudies(prev => prev.map(t => {
      if (t.id === topicId) {
        return {
          ...t,
          feedbacks: (t.feedbacks || []).filter(f => f.id !== feedbackId)
        };
      }
      return t;
    }));
  };

  // Handler functions for Thanh lệnh 6: Directives (Công văn chỉ đạo)
  const handleSaveDirective = (directive: SchoolDirective) => {
    setDirectives(prev => [directive, ...prev]);
  };

  const handleDeleteDirective = (id: string) => {
    setDirectives(prev => prev.filter(d => d.id !== id));
  };

  // Handler functions for Thanh lệnh 7: Meetings (Thông báo họp Zoom)
  const handleSaveMeeting = (meeting: MeetingNotice) => {
    setMeetings(prev => [meeting, ...prev]);
  };

  const handleDeleteMeeting = (id: string) => {
    setMeetings(prev => prev.filter(m => m.id !== id));
  };

  // Handler functions for Thanh lệnh 8: Class Timetables (TKB)
  const handleSaveTimetable = (timetable: ClassTimetable) => {
    setTimetables(prev => {
      const exists = prev.some(t => t.id === timetable.id);
      if (exists) {
        return prev.map(t => t.id === timetable.id ? timetable : t);
      }
      return [timetable, ...prev];
    });
  };

  const handleDeleteTimetable = (id: string) => {
    setTimetables(prev => prev.filter(t => t.id !== id));
  };

  const handleApproveTimetable = (id: string, status: 'Đã duyệt' | 'Áp dụng chính thức' | 'Chờ duyệt', feedback?: string) => {
    const leaderName = members.find(m => m.isLeader)?.name || 'Nguyễn Thị Bé Tý';
    setTimetables(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status,
          reviewedBy: `Tổ trưởng ${leaderName}`,
          leaderFeedback: feedback || 'Tổ trưởng đã thẩm định và phê duyệt áp dụng chính thức.',
          updatedAt: new Date().toLocaleDateString('vi-VN')
        };
      }
      return t;
    }));
  };

  // Handler functions for Thanh lệnh 9: Emulations (Xét thi đua)
  const handleSaveEmulation = (record: EmulationRecord) => {
    setEmulations(prev => {
      const exists = prev.some(r => r.id === record.id);
      if (exists) {
        return prev.map(r => r.id === record.id ? record : r);
      }
      return [record, ...prev];
    });
  };

  const handleDeleteEmulation = (id: string) => {
    setEmulations(prev => prev.filter(e => e.id !== id));
  };

  const handleSaveEmulationDoc = (doc: EmulationDocument) => {
    setEmulationDocuments(prev => [doc, ...prev]);
  };

  const handleDeleteEmulationDoc = (id: string) => {
    setEmulationDocuments(prev => prev.filter(d => d.id !== id));
  };

  const handleResetToDefault = async () => {
    await clearAllPersistentData();
    setMembers(INITIAL_MEMBERS);
    setCurrentUser(INITIAL_MEMBERS.find(m => m.name === 'Nguyễn Thị Bé Tý' || m.isLeader) || INITIAL_MEMBERS[0]);
    setReports(INITIAL_MONTHLY_REPORTS);
    setStrugglingStudents(INITIAL_STRUGGLING_STUDENTS);
    setTeamDocuments(INITIAL_TEAM_DOCUMENTS);
    setExamsAndPlans(INITIAL_EXAMS_AND_PLANS);
    setLessonStudies(INITIAL_LESSON_STUDIES);
    setDirectives(INITIAL_DIRECTIVES);
    setMeetings(INITIAL_MEETINGS);
    setEmulations(INITIAL_EMULATIONS);
    setEmulationDocuments([]);
    setTimetables(INITIAL_TIMETABLES);
    setSettings(INITIAL_APP_SETTINGS);
    setSecretPasswordLeader('Tt112233');

    // clear localStorage keys
    const keys = [
      'tanthanh_k5_members',
      'tanthanh_k5_reports',
      'tanthanh_k5_timetables',
      'tanthanh_k5_directives',
      'tanthanh_k5_meetings',
      'tanthanh_k5_team_docs',
      'tanthanh_k5_exams',
      'tanthanh_k5_emulations',
      'tanthanh_k5_emulation_docs'
    ];
    keys.forEach(k => localStorage.removeItem(k));

    alert('Đã thiết lập lại trạng thái ban đầu của ứng dụng (Cô Nguyễn Thị Bé Tý - Tổ trưởng Chuyên môn Khối 5 & Cô Phan Thị Mỹ Linh - GVCN Lớp 5A1)!');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        settings={settings}
        currentUser={currentUser}
        members={members}
        onSelectUser={setCurrentUser}
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenPromptModal={() => setShowPromptModal(true)}
        onResetData={handleResetToDefault}
        onOpenBackupModal={() => setShowBackupModal(true)}
      />

      {/* Navigation Command Bar */}
      <Navigation
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        counts={{
          reportsCount: reports.length,
          strugglingCount: strugglingStudents.filter(s => s.progressStatus !== 'Đã hoàn thành mục tiêu').length,
          teamPlansCount: teamDocuments.length,
          examsCount: examsAndPlans.filter(e => e.status === 'Chờ duyệt').length,
          lessonStudiesCount: lessonStudies.length,
          directivesCount: directives.length,
          meetingsCount: meetings.length,
          timetableCount: timetables.length,
          emulationCount: emulations.length + emulationDocuments.length
        }}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'reports' && (
          <MonthlyReportView
            reports={reports}
            members={members}
            currentUser={currentUser}
            onSaveReport={handleSaveReport}
            onDeleteReport={handleDeleteReport}
          />
        )}

        {activeTab === 'struggling' && (
          <StrugglingStudentsView
            students={strugglingStudents}
            members={members}
            currentUser={currentUser}
            onAddStudent={handleAddStudent}
            onUpdateStudent={handleUpdateStudent}
            onRemoveStudent={handleRemoveStudent}
          />
        )}

        {activeTab === 'team-plans' && (
          <TeamDocumentsView
            documents={teamDocuments}
            currentUser={currentUser}
            onUploadDocument={handleUploadDocument}
            onDeleteDocument={handleDeleteDocument}
          />
        )}

        {activeTab === 'exams-plans' && (
          <ExamAndLessonPlansView
            items={examsAndPlans}
            members={members}
            currentUser={currentUser}
            secretPasswordLeader={secretPasswordLeader}
            onSaveItem={handleSaveExamItem}
            onApproveItem={handleApproveExamItem}
            onDeleteItem={handleDeleteExamItem}
            onUpdatePassword={setSecretPasswordLeader}
          />
        )}

        {activeTab === 'lesson-study' && (
          <LessonStudyView
            topics={lessonStudies}
            members={members}
            currentUser={currentUser}
            onSaveTopic={handleSaveTopic}
            onAddFeedback={handleAddFeedback}
            onDeleteTopic={handleDeleteTopic}
            onDeleteFeedback={handleDeleteFeedback}
          />
        )}

        {/* Separated: Công văn chỉ đạo */}
        {activeTab === 'directives' && (
          <DirectivesView
            directives={directives}
            members={members}
            currentUser={currentUser}
            onSaveDirective={handleSaveDirective}
            onDeleteDirective={handleDeleteDirective}
          />
        )}

        {/* Separated: Thông báo họp trực tuyến Zoom */}
        {activeTab === 'meetings' && (
          <MeetingNoticesView
            meetings={meetings}
            members={members}
            currentUser={currentUser}
            onSaveMeeting={handleSaveMeeting}
            onDeleteMeeting={handleDeleteMeeting}
          />
        )}

        {/* Thời khóa biểu (TKB) - chỉ hiện khi GV tải lên */}
        {activeTab === 'timetable' && (
          <ClassTimetableView
            timetables={timetables}
            members={members}
            currentUser={currentUser}
            onSaveTimetable={handleSaveTimetable}
            onDeleteTimetable={handleDeleteTimetable}
            onApproveTimetable={handleApproveTimetable}
          />
        )}

        {/* Xét thi đua - hỗ trợ Excel & Word */}
        {activeTab === 'emulation' && (
          <EmulationEvaluationView
            records={emulations}
            emulationDocuments={emulationDocuments}
            members={members}
            currentUser={currentUser}
            onSaveRecord={handleSaveEmulation}
            onDeleteRecord={handleDeleteEmulation}
            onSaveEmulationDoc={handleSaveEmulationDoc}
            onDeleteEmulationDoc={handleDeleteEmulationDoc}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-500 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <strong>{settings.schoolName}</strong> — {settings.teamName} ({settings.academicYear})
          </div>
          <div className="text-slate-500">
            Hệ thống quản lý chuyên môn Khối 5 • Thư mục KHBD &amp; Ngân hàng đề thi được bảo mật bởi <strong>Tổ trưởng Nguyễn Thị Bé Tý</strong>
            {(currentUser.isLeader || currentUser.name.includes('Bé Tý')) && (
              <span className="ml-2 text-amber-700 font-semibold font-mono bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                MK TT: {secretPasswordLeader}
              </span>
            )}
          </div>
        </div>
      </footer>

      {/* Modals */}
      <MemberManagementModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        members={members}
        onUpdateMembers={setMembers}
        settings={settings}
        onUpdateSettings={setSettings}
        onResetToDefault={handleResetToDefault}
      />

      <PromptModal
        isOpen={showPromptModal}
        onClose={() => setShowPromptModal(false)}
      />

      <BackupRestoreModal
        isOpen={showBackupModal}
        onClose={() => setShowBackupModal(false)}
        onDataRestored={reloadAllDataFromStorage}
      />
    </div>
  );
}
