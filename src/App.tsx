/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  TeacherMember, 
  MonthlyReport, 
  StrugglingStudent, 
  TeamPlanDocument, 
  ExamAndLessonPlan, 
  LessonStudyTopic, 
  LessonStudyFeedback,
  SchoolDirective, 
  EmulationRecord,
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
  INITIAL_EMULATIONS, 
  INITIAL_TIMETABLES,
  INITIAL_APP_SETTINGS 
} from './data/initialData';

import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { MonthlyReportView } from './components/MonthlyReportView';
import { StrugglingStudentsView } from './components/StrugglingStudentsView';
import { TeamDocumentsView } from './components/TeamDocumentsView';
import { ExamAndLessonPlansView } from './components/ExamAndLessonPlansView';
import { LessonStudyView } from './components/LessonStudyView';
import { NoticesAndDirectivesView } from './components/NoticesAndDirectivesView';
import { EmulationEvaluationView } from './components/EmulationEvaluationView';
import { ClassTimetableView } from './components/ClassTimetableView';
import { MemberManagementModal } from './components/MemberManagementModal';
import { PromptModal } from './components/PromptModal';

export default function App() {
  // App Settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('tanthanh_k5_settings');
    return saved ? JSON.parse(saved) : INITIAL_APP_SETTINGS;
  });

  // Leader Secret Password (Default: Tt112233)
  const [secretPasswordLeader, setSecretPasswordLeader] = useState<string>(() => {
    return localStorage.getItem('tanthanh_k5_leader_pass') || 'Tt112233';
  });

  // Members list (ensure Nguyễn Thị Bé Tý is Tổ trưởng)
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
          return { ...m, isLeader: false, assignedClass: '5A1(ĐC)' };
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

  // Module data
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

  const [directives, setDirectives] = useState<SchoolDirective[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_directives');
    if (!saved) return INITIAL_DIRECTIVES;
    try {
      const parsed: SchoolDirective[] = JSON.parse(saved);
      return parsed.map(d => ({
        ...d,
        senderName: d.senderName?.includes('Phan Thị Mỹ Linh') ? 'Tổ trưởng Nguyễn Thị Bé Tý' : (d.senderName || 'Tổ trưởng Nguyễn Thị Bé Tý')
      }));
    } catch {
      return INITIAL_DIRECTIVES;
    }
  });

  const [emulations, setEmulations] = useState<EmulationRecord[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_emulations');
    return saved ? JSON.parse(saved) : INITIAL_EMULATIONS;
  });

  const [timetables, setTimetables] = useState<ClassTimetable[]>(() => {
    const saved = localStorage.getItem('tanthanh_k5_timetables');
    return saved ? JSON.parse(saved) : INITIAL_TIMETABLES;
  });

  // Modals state
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showPromptModal, setShowPromptModal] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('tanthanh_k5_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('tanthanh_k5_leader_pass', secretPasswordLeader);
  }, [secretPasswordLeader]);

  useEffect(() => {
    localStorage.setItem('tanthanh_k5_members', JSON.stringify(members));
    // update current user reference if updated
    const found = members.find(m => m.id === currentUser.id);
    if (found) setCurrentUser(found);
  }, [members]);

  useEffect(() => {
    localStorage.setItem('tanthanh_k5_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('tanthanh_k5_struggling', JSON.stringify(strugglingStudents));
  }, [strugglingStudents]);

  useEffect(() => {
    localStorage.setItem('tanthanh_k5_team_docs', JSON.stringify(teamDocuments));
  }, [teamDocuments]);

  useEffect(() => {
    localStorage.setItem('tanthanh_k5_exams', JSON.stringify(examsAndPlans));
  }, [examsAndPlans]);

  useEffect(() => {
    localStorage.setItem('tanthanh_k5_lesson_studies', JSON.stringify(lessonStudies));
  }, [lessonStudies]);

  useEffect(() => {
    localStorage.setItem('tanthanh_k5_directives', JSON.stringify(directives));
  }, [directives]);

  useEffect(() => {
    localStorage.setItem('tanthanh_k5_emulations', JSON.stringify(emulations));
  }, [emulations]);

  useEffect(() => {
    localStorage.setItem('tanthanh_k5_timetables', JSON.stringify(timetables));
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
    setExamsAndPlans(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          reviewNote,
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

  // Handler functions for Thanh lệnh 6: Directives
  const handleSaveDirective = (directive: SchoolDirective) => {
    setDirectives(prev => [directive, ...prev]);
  };

  const handleDeleteDirective = (id: string) => {
    setDirectives(prev => prev.filter(d => d.id !== id));
  };

  // Handler functions for Thanh lệnh 7: Emulations
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
    setTimetables(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status,
          reviewedBy: 'Tổ trưởng Nguyễn Thị Bé Tý',
          leaderFeedback: feedback || 'Tổ trưởng đã thẩm định và phê duyệt áp dụng chính thức.',
          updatedAt: new Date().toLocaleDateString('vi-VN')
        };
      }
      return t;
    }));
  };

  const handleResetToDefault = () => {
    setMembers(INITIAL_MEMBERS);
    setCurrentUser(INITIAL_MEMBERS.find(m => m.name === 'Nguyễn Thị Bé Tý' || m.isLeader) || INITIAL_MEMBERS[0]);
    setReports(INITIAL_MONTHLY_REPORTS);
    setStrugglingStudents(INITIAL_STRUGGLING_STUDENTS);
    setTeamDocuments(INITIAL_TEAM_DOCUMENTS);
    setExamsAndPlans(INITIAL_EXAMS_AND_PLANS);
    setLessonStudies(INITIAL_LESSON_STUDIES);
    setDirectives(INITIAL_DIRECTIVES);
    setEmulations(INITIAL_EMULATIONS);
    setTimetables(INITIAL_TIMETABLES);
    setSettings(INITIAL_APP_SETTINGS);
    setSecretPasswordLeader('Tt112233');
    localStorage.removeItem('tanthanh_k5_timetables');
    alert('Đã khôi phục toàn bộ danh sách 15 thành viên và dữ liệu gốc ban đầu thành công!');
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
          timetableCount: timetables.length,
          emulationCount: emulations.length
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

        {activeTab === 'directives' && (
          <NoticesAndDirectivesView
            directives={directives}
            currentUser={currentUser}
            onSaveDirective={handleSaveDirective}
            onDeleteDirective={handleDeleteDirective}
          />
        )}

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

        {activeTab === 'emulation' && (
          <EmulationEvaluationView
            records={emulations}
            members={members}
            currentUser={currentUser}
            onSaveRecord={handleSaveEmulation}
            onDeleteRecord={handleDeleteEmulation}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-500 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <strong>{settings.schoolName}</strong> — {settings.teamName} ({settings.academicYear})
          </div>
          <div className="text-slate-400">
            Hệ thống quản lý chuyên môn Khối 5 • Mật khẩu duyệt đề: <span className="font-mono text-slate-600 font-bold">Tt112233</span>
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
    </div>
  );
}
