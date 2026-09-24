import {
  TeacherMember,
  MonthlyReport,
  StrugglingStudent,
  TeamPlanDocument,
  ExamAndLessonPlan,
  LessonStudyTopic,
  SchoolDirective,
  EmulationRecord,
  ClassTimetable
} from '../types';

export const INITIAL_MEMBERS: TeacherMember[] = [
  {
    id: 'gv-1',
    stt: 1,
    name: 'Phan Thị Mỹ Linh',
    birthDate: '16/12/1995',
    isPartyMember: true,
    campus: 'Trường chính',
    assignedClass: '5A1(ĐC)',
    totalStudents: 35,
    femaleStudents: 20,
    yearJoined: 2020,
    isLeader: false,
    phone: '0912 345 601',
    email: 'mylinh.thtanthanh@gmail.com'
  },
  {
    id: 'gv-2',
    stt: 2,
    name: 'Nguyễn Thị Hồng Nguyệt',
    birthDate: '13/07/1971',
    isPartyMember: false,
    campus: 'Trường chính',
    assignedClass: '5A2(ĐC)',
    totalStudents: 36,
    femaleStudents: 13,
    yearJoined: 1996,
    isLeader: false,
    phone: '0912 345 602',
    email: 'hongnguyet.thtanthanh@gmail.com'
  },
  {
    id: 'gv-3',
    stt: 3,
    name: 'Phạm Thị Hồng Nhiên',
    birthDate: '23/03/1996',
    isPartyMember: false,
    campus: 'Trường chính',
    assignedClass: '5A3(ĐC)',
    totalStudents: 35,
    femaleStudents: 16,
    yearJoined: 2024,
    isLeader: false,
    phone: '0912 345 603',
    email: 'hongnhien.thtanthanh@gmail.com'
  },
  {
    id: 'gv-4',
    stt: 4,
    name: 'Phạm Thị Việt Trinh',
    birthDate: '25/07/2000',
    isPartyMember: false,
    campus: 'Trường chính',
    assignedClass: '5A4(ĐC)',
    totalStudents: 36,
    femaleStudents: 19,
    yearJoined: 2026,
    isLeader: false,
    phone: '0912 345 604',
    email: 'viettrinh.thtanthanh@gmail.com'
  },
  {
    id: 'gv-5',
    stt: 5,
    name: 'Đặng Ngọc Kim Ngân',
    birthDate: '10/11/1999',
    isPartyMember: true,
    campus: 'Trường chính',
    assignedClass: 'GV Chuyên trách Khối 5',
    totalStudents: 0,
    femaleStudents: 0,
    yearJoined: 2024,
    isLeader: false,
    phone: '0912 345 605',
    email: 'kimngan.thtanthanh@gmail.com'
  },
  {
    id: 'gv-6',
    stt: 6,
    name: 'Nguyễn Thị Bé Tý',
    birthDate: '17/10/1980',
    isPartyMember: true,
    campus: 'Kiến Bình',
    assignedClass: 'Tổ trưởng Chuyên môn Khối 5',
    totalStudents: 0,
    femaleStudents: 0,
    yearJoined: 2000,
    isLeader: true,
    phone: '0912 345 606',
    email: 'bety.thtanthanh@gmail.com'
  },
  {
    id: 'gv-7',
    stt: 7,
    name: 'Hồ Mộng Tuyết',
    birthDate: '17/10/1973',
    isPartyMember: false,
    campus: 'Kiến Bình',
    assignedClass: '5A(KB)',
    totalStudents: 35,
    femaleStudents: 19,
    yearJoined: 1996,
    isLeader: false,
    phone: '0912 345 607',
    email: 'mongtuyet.thtanthanh@gmail.com'
  },
  {
    id: 'gv-8',
    stt: 8,
    name: 'Lê Thị Mai',
    birthDate: '14/04/1980',
    isPartyMember: true,
    campus: 'Kiến Bình',
    assignedClass: '5B(KB)',
    totalStudents: 11,
    femaleStudents: 5,
    yearJoined: 2000,
    isLeader: false,
    phone: '0912 345 608',
    email: 'thimai.thtanthanh@gmail.com'
  },
  {
    id: 'gv-9',
    stt: 9,
    name: 'Trần Công Minh',
    birthDate: '09/01/1979',
    isPartyMember: true,
    campus: 'Kiến Bình',
    assignedClass: '5C(KB)',
    totalStudents: 31,
    femaleStudents: 14,
    yearJoined: 2000,
    isLeader: false,
    phone: '0912 345 609',
    email: 'congminh.thtanthanh@gmail.com'
  },
  {
    id: 'gv-10',
    stt: 10,
    name: 'Nguyễn Hoàng Tuấn',
    birthDate: '21/05/1965',
    isPartyMember: false,
    campus: 'Tân Bình',
    assignedClass: '5A(TB)',
    totalStudents: 31,
    femaleStudents: 15,
    yearJoined: 1985,
    isLeader: false,
    phone: '0912 345 610',
    email: 'hoangtuan.thtanthanh@gmail.com'
  },
  {
    id: 'gv-11',
    stt: 11,
    name: 'Nguyễn Thị Huế',
    birthDate: '31/01/1979',
    isPartyMember: true,
    campus: 'Tân Bình',
    assignedClass: '5B(TB)',
    totalStudents: 16,
    femaleStudents: 8,
    yearJoined: 2002,
    isLeader: false,
    phone: '0912 345 611',
    email: 'thihue.thtanthanh@gmail.com'
  },
  {
    id: 'gv-12',
    stt: 12,
    name: 'Pho Thị Bích Ngân',
    birthDate: '18/06/1999',
    isPartyMember: true,
    campus: 'Tân Hòa',
    assignedClass: '5A1',
    totalStudents: 26,
    femaleStudents: 12,
    yearJoined: 2024,
    isLeader: false,
    phone: '0912 345 612',
    email: 'bichngan.thtanthanh@gmail.com'
  },
  {
    id: 'gv-13',
    stt: 13,
    name: 'Lê Văn Hồng',
    birthDate: '18/09/1972',
    isPartyMember: true,
    campus: 'Tân Hòa',
    assignedClass: '5A2',
    totalStudents: 28,
    femaleStudents: 11,
    yearJoined: 1995,
    isLeader: false,
    phone: '0912 345 613',
    email: 'vanhong.thtanthanh@gmail.com'
  },
  {
    id: 'gv-14',
    stt: 14,
    name: 'Trương Thị Loan',
    birthDate: '05/12/1970',
    isPartyMember: true,
    campus: 'Tân Hòa',
    assignedClass: '5B(TH)',
    totalStudents: 22,
    femaleStudents: 10,
    yearJoined: 1991,
    isLeader: false,
    phone: '0912 345 614',
    email: 'thiloan.thtanthanh@gmail.com'
  },
  {
    id: 'gv-15',
    stt: 15,
    name: 'Trần Thị Phương Giang',
    birthDate: '05/06/1982',
    isPartyMember: true,
    campus: 'Đinh Văn Phu',
    assignedClass: 'Lớp 5',
    totalStudents: 32,
    femaleStudents: 18,
    yearJoined: 2004,
    isLeader: false,
    phone: '0912 345 615',
    email: 'phuonggiang.thtanthanh@gmail.com'
  }
];

export const INITIAL_MONTHLY_REPORTS: MonthlyReport[] = [
  {
    id: 'rep-9-5a1',
    month: 'Tháng 9',
    classId: 'gv-1',
    className: '5A1(ĐC)',
    teacherId: 'gv-1',
    teacherName: 'Phan Thị Mỹ Linh',
    campus: 'Trường chính',
    totalStudents: 35,
    femaleStudents: 20,
    ethnicStudents: 1,
    disabledStudentsCount: 1,
    disabledStudents: [
      {
        id: 'dis-1',
        name: 'Nguyễn Văn Tâm',
        gender: 'Nam',
        disabilityType: 'Khuyết tật nghe nói nhẹ (Đeo máy trợ thính)',
        note: 'HS hòa nhập tốt, xếp ngồi bàn đầu, tiếp thu chậm môn Tiếng Anh'
      }
    ],
    studentsMovedIn: 0,
    studentsMovedOut: 0,
    dropouts: 0,
    absenteeismNotes: 'Chuyên cần đạt 99.2%, có 2 lượt nghỉ ốm có phép.',
    submittedAt: '25/09/2026',
    status: 'Đã duyệt'
  },
  {
    id: 'rep-9-5a2',
    month: 'Tháng 9',
    classId: 'gv-2',
    className: '5A2(ĐC)',
    teacherId: 'gv-2',
    teacherName: 'Nguyễn Thị Hồng Nguyệt',
    campus: 'Trường chính',
    totalStudents: 36,
    femaleStudents: 13,
    ethnicStudents: 0,
    disabledStudentsCount: 0,
    disabledStudents: [],
    studentsMovedIn: 0,
    studentsMovedOut: 0,
    dropouts: 0,
    absenteeismNotes: 'Sĩ số ổn định, lớp nề nếp tốt ngay từ tuần 1.',
    submittedAt: '26/09/2026',
    status: 'Đã duyệt'
  },
  {
    id: 'rep-9-5akb',
    month: 'Tháng 9',
    classId: 'gv-7',
    className: '5A(KB)',
    teacherId: 'gv-7',
    teacherName: 'Hồ Mộng Tuyết',
    campus: 'Kiến Bình',
    totalStudents: 35,
    femaleStudents: 19,
    ethnicStudents: 2,
    disabledStudentsCount: 1,
    disabledStudents: [
      {
        id: 'dis-2',
        name: 'Trần Minh Quân',
        gender: 'Nam',
        disabilityType: 'Khuyết tật vận động nhẹ (Chân phải yếu)',
        note: 'Được hỗ trợ di chuyển lên phòng tin học, năng nổ học tập.'
      }
    ],
    studentsMovedIn: 0,
    studentsMovedOut: 0,
    dropouts: 0,
    absenteeismNotes: '100% chuyên cần trong tháng khai giảng.',
    submittedAt: '27/09/2026',
    status: 'Đã duyệt'
  },
  {
    id: 'rep-9-5c-kb',
    month: 'Tháng 9',
    classId: 'gv-9',
    className: '5C(KB)',
    teacherId: 'gv-9',
    teacherName: 'Trần Công Minh',
    campus: 'Kiến Bình',
    totalStudents: 31,
    femaleStudents: 14,
    ethnicStudents: 0,
    disabledStudentsCount: 1,
    disabledStudents: [
      {
        id: 'dis-3',
        name: 'Lê Hoàng Yến',
        gender: 'Nữ',
        disabilityType: 'Khuyết tật trí tuệ nhẹ',
        note: 'Kế hoạch GD cá nhân riêng, đánh giá vì sự tiến bộ theo Thông tư 27/2020.'
      }
    ],
    studentsMovedIn: 0,
    studentsMovedOut: 0,
    dropouts: 0,
    absenteeismNotes: 'Không có hiện tượng bỏ học.',
    submittedAt: '27/09/2026',
    status: 'Đã duyệt'
  }
];

export const INITIAL_STRUGGLING_STUDENTS: StrugglingStudent[] = [
  {
    id: 'st-1',
    name: 'Nguyễn Thành Đạt',
    className: '5A1(ĐC)',
    campus: 'Trường chính',
    teacherId: 'gv-1',
    teacherName: 'Phan Thị Mỹ Linh',
    subject: 'Toán',
    weaknessDetail: 'Chưa thành thạo phép nhân, chia số thập phân; hay nhầm dấu phẩy',
    supportAction: 'Kèm 15 phút đầu giờ sáng; giao phiếu bài tập vừa sức; nhờ bạn cùng bàn nhắc nhở',
    progressStatus: 'Đang cải thiện',
    currentScoreOrLevel: 'Điểm KTĐK: 5.5 (đã nhớ quy tắc đặt dấu phẩy)',
    dateAdded: '15/09/2026'
  },
  {
    id: 'st-2',
    name: 'Lê Thị Thu Thảo',
    className: '5A3(ĐC)',
    campus: 'Trường chính',
    teacherId: 'gv-3',
    teacherName: 'Phạm Thị Hồng Nhiên',
    subject: 'Tiếng Việt',
    weaknessDetail: 'Đọc diễn cảm chưa đạt, viết văn miêu tả câu cụt lủn, sai lỗi chính tả s/x, tr/ch',
    supportAction: 'Rèn đọc đoạn văn 5 phút mỗi ngày, hướng dẫn lập dàn ý mở bài - kết bài mở rộng',
    progressStatus: 'Cần nỗ lực nhiều',
    currentScoreOrLevel: 'Chưa hoàn thành tốt câu văn miêu tả',
    dateAdded: '18/09/2026'
  },
  {
    id: 'st-3',
    name: 'Huỳnh Gia Bảo',
    className: '5A(KB)',
    campus: 'Kiến Bình',
    teacherId: 'gv-7',
    teacherName: 'Hồ Mộng Tuyết',
    subject: 'Tiếng Anh',
    weaknessDetail: 'Phát âm chưa chuẩn âm cuối, vốn từ vựng bài 1, 2 còn thiếu',
    supportAction: 'Cho nghe lại audio ứng dụng học tập, thực hành đóng vai nhóm đôi',
    progressStatus: 'Đang cải thiện',
    currentScoreOrLevel: 'Đã nhớ từ vựng Unit 1 & 2',
    dateAdded: '20/09/2026'
  },
  {
    id: 'st-4',
    name: 'Võ Minh Khang',
    className: '5C(KB)',
    campus: 'Kiến Bình',
    teacherId: 'gv-9',
    teacherName: 'Trần Công Minh',
    subject: 'Toán',
    weaknessDetail: 'Chưa giải được bài toán tìm hai số khi biết tổng và tỉ số',
    supportAction: 'Vẽ sơ đồ đoạn thẳng trực quan, chia nhỏ các bước tìm tổng số phần bằng nhau',
    progressStatus: 'Đã hoàn thành mục tiêu',
    currentScoreOrLevel: 'Điểm kiểm tra: 7.0 (Đã biết vẽ sơ đồ)',
    dateAdded: '10/09/2026',
    resolvedDate: '28/09/2026'
  },
  {
    id: 'st-5',
    name: 'Trần Văn Hưng',
    className: '5A(TB)',
    campus: 'Tân Bình',
    teacherId: 'gv-10',
    teacherName: 'Nguyễn Hoàng Tuấn',
    subject: 'Khoa học',
    weaknessDetail: 'Ít phát biểu, chưa liên hệ được bài học Sự biến đổi chất vào thực tế',
    supportAction: 'Giao làm thí nghiệm nhỏ với chanh và bột nở ở lớp',
    progressStatus: 'Đang cải thiện',
    currentScoreOrLevel: 'Đã tích cực tham gia thảo luận nhóm',
    dateAdded: '22/09/2026'
  }
];

export const INITIAL_TEAM_DOCUMENTS: TeamPlanDocument[] = [
  {
    id: 'doc-1',
    title: 'Kế hoạch Giáo dục Tổ Chuyên Môn Khối 5 - Năm học 2026-2027',
    category: 'Kế hoạch GD Tổ',
    description: 'Kế hoạch triển khai nhiệm vụ chuyên môn theo CT GDPT 2018, chỉ tiêu thi đua, phân công công tác.',
    fileName: 'KHGD_To_Khoi5_2026_2027_ChinhThuc.pdf',
    fileSize: '1.8 MB',
    uploadedBy: 'Nguyễn Thị Bé Tý (Tổ trưởng)',
    teacherId: 'gv-6',
    uploadedAt: '20/09/2026',
    fileContentText: 'Kế hoạch giáo dục chi tiết năm học 2026-2027 của Trường Tiểu Học Tân Thạnh - Khối 5...'
  },
  {
    id: 'doc-2',
    title: 'Phân phối chương trình chi tiết các môn học Lớp 5 (35 tuần thực học)',
    category: 'Phân phối CT',
    description: 'Khung phân phối số tiết Toán, Tiếng Việt, Lịch sử - Địa lý, Khoa học, HĐTN, Đạo đức, Công nghệ.',
    fileName: 'PhanPhoiChuongTrinh_Lop5_NamHoc2026.docx',
    fileSize: '840 KB',
    uploadedBy: 'Nguyễn Thị Bé Tý (Tổ trưởng)',
    teacherId: 'gv-6',
    uploadedAt: '21/09/2026'
  },
  {
    id: 'doc-3',
    title: 'Kế hoạch tích hợp Giáo dục Quốc phòng và An ninh (QPAN) trong môn Tiếng Việt & Lịch sử 5',
    category: 'KH Tích hợp QPAN',
    description: 'Địa chỉ tích hợp cụ thể từng bài học theo Thông tư hướng dẫn GDQPAN cấp tiểu học.',
    fileName: 'KeHoach_TichHop_QPAN_Khoi5.pdf',
    fileSize: '620 KB',
    uploadedBy: 'Trần Công Minh',
    teacherId: 'gv-9',
    uploadedAt: '22/09/2026'
  },
  {
    id: 'doc-4',
    title: 'Kế hoạch Giáo dục STEM Khối 5 - 4 chủ đề/học kỳ',
    category: 'KH STEM',
    description: 'Chủ đề: Dụng cụ đo góc tự chế, Bình lọc nước mini, Mô hình hệ Mặt Trời, Nhà nổi chống lũ.',
    fileName: 'KeHoach_BaiHoc_STEM_Khoi5.pdf',
    fileSize: '2.1 MB',
    uploadedBy: 'Phan Thị Mỹ Linh',
    teacherId: 'gv-1',
    uploadedAt: '24/09/2026'
  }
];

export const INITIAL_EXAMS_AND_PLANS: ExamAndLessonPlan[] = [
  {
    id: 'exam-1',
    folderCategory: 'Đề thi GHK I',
    title: 'Đề kiểm tra Giữa Học kỳ I môn Toán 5 + Ma trận + Bản đặc tả',
    className: '5A1(ĐC)',
    campus: 'Trường chính',
    subject: 'Toán',
    teacherId: 'gv-1',
    teacherName: 'Phan Thị Mỹ Linh',
    fileName: 'DeThi_GHK1_Toan_Lop5A1_MaTran_DapAn.docx',
    fileSize: '540 KB',
    submittedAt: '28/09/2026',
    status: 'Chờ duyệt',
    matrixIncluded: true,
    answerKeyIncluded: true,
    contentPreview: 'Đề gồm 4 mức độ theo Thông tư 27. Phần 1: Trắc nghiệm 4 điểm. Phần 2: Tự luận 6 điểm gồm phân số, số thập phân và toán giải...'
  },
  {
    id: 'exam-2',
    folderCategory: 'Đề thi GHK I',
    title: 'Đề kiểm tra Giữa HK I Tiếng Việt 5 (Đọc thành tiếng, Đọc hiểu, Viết)',
    className: '5A(KB)',
    campus: 'Kiến Bình',
    subject: 'Tiếng Việt',
    teacherId: 'gv-7',
    teacherName: 'Hồ Mộng Tuyết',
    fileName: 'DeThi_GHK1_TiengViet_5A_KienBinh.docx',
    fileSize: '620 KB',
    submittedAt: '27/09/2026',
    status: 'Đã duyệt',
    reviewNote: 'Đề bám sát chuẩn kiến thức kĩ năng, câu hỏi phân hóa tốt mức độ 3 và 4. Đã duyệt cho photo.',
    reviewedAt: '28/09/2026',
    matrixIncluded: true,
    answerKeyIncluded: true,
    contentPreview: 'Bài đọc: Về thăm bà nội. Đoán nghĩa từ ngữ trong ngữ cảnh, biện pháp so sánh nhân hóa...'
  },
  {
    id: 'plan-1',
    folderCategory: 'KHDH',
    title: 'Kế hoạch bài dạy Tuần 1 đến Tuần 5 môn Toán & Tiếng Việt',
    className: '5B(KB)',
    campus: 'Kiến Bình',
    subject: 'Toán & Tiếng Việt',
    teacherId: 'gv-8',
    teacherName: 'Lê Thị Mai',
    fileName: 'KHDH_Tuan1_den_Tuan5_Lop5B_LeThiMai.pdf',
    fileSize: '3.4 MB',
    submittedAt: '18/09/2026',
    status: 'Đã duyệt',
    reviewNote: 'Thiết kế tiến trình theo CV 2345 rõ ràng 4 bước, mục tiêu năng lực phẩm chất cụ thể.',
    reviewedAt: '19/09/2026',
    matrixIncluded: false,
    answerKeyIncluded: false
  },
  {
    id: 'exam-3',
    folderCategory: 'Đề thi HK I',
    title: 'Dự thảo Ngân hàng câu hỏi trắc nghiệm Lịch sử & Địa lý 5 HK I',
    className: '5A2(ĐC)',
    campus: 'Trường chính',
    subject: 'Lịch sử & Địa lý',
    teacherId: 'gv-2',
    teacherName: 'Nguyễn Thị Hồng Nguyệt',
    fileName: 'NganHangCauHoi_LS_DL_5_HK1.docx',
    fileSize: '410 KB',
    submittedAt: '25/09/2026',
    status: 'Chờ duyệt',
    matrixIncluded: true,
    answerKeyIncluded: true
  }
];

export const INITIAL_LESSON_STUDIES: LessonStudyTopic[] = [
  {
    id: 'ls-1',
    topicTitle: 'Dạy học phát triển năng lực qua bài: Khái niệm số thập phân (Toán 5)',
    subject: 'Toán',
    unit: 'Chủ đề Phân số & Số thập phân',
    teachingTeacherId: 'gv-1',
    teachingTeacherName: 'Phan Thị Mỹ Linh',
    teachingClass: '5A1(ĐC)',
    campus: 'Trường chính',
    implementationDate: '15/10/2026',
    rationalePlan: `1. Lý do chọn chuyên đề: Học sinh chuyển tiếp từ phân số thập phân sang số thập phân thường bỡ ngỡ về cấu tạo hàng và vị trí dấu phẩy.
2. Phương án sư phạm:
- Ứng dụng phần mềm mô phỏng thước đo milimét và vạch chia số thập phân trực quan.
- Dạy học theo trạm: Trạm 1 thực hành đo độ dài, Trạm 2 chuyển đổi đơn vị, Trạm 3 ghi bảng số.
- Học sinh tự phát hiện ra quy luật ghi số thập phân trước khi giáo viên chốt kiến thức.
3. Dự kiến khó khăn: Học sinh chậm có thể lúng túng khi viết số 0 ở phần nguyên.`,
    lessonPlanDocName: 'KHBD_ChuyenDe_Toan5_KhaiNiemSoThapPhan_MyLinh.docx',
    lessonPlanContent: 'Kế hoạch bài dạy chi tiết với các hoạt động Khởi động, Khám phá, Luyện tập, Vận dụng theo CV 2345...',
    feedbacks: [
      {
        id: 'fb-1',
        teacherId: 'gv-6',
        teacherName: 'Nguyễn Thị Bé Tý',
        teacherClass: '5A(TB)',
        campus: 'Tân Bình',
        aspect: 'Khởi động',
        feedbackText: 'Trò chơi "Tiếp sức chuyển đổi phân số" ở hoạt động Khởi động rất sôi nổi, kết nối kiến thức cũ tốt. Góp ý nên giới hạn thời gian 4-5 phút để dành thời gian cho hoạt động Khám phá.',
        createdAt: '22/09/2026 14:30'
      },
      {
        id: 'fb-2',
        teacherId: 'gv-9',
        teacherName: 'Trần Công Minh',
        teacherClass: '5A4(ĐC)',
        campus: 'Trường chính',
        aspect: 'Khám phá',
        feedbackText: 'Ở hoạt động Khám phá, phương án chia trạm thực hành đo thước milimét rất trực quan. Nên tăng thời gian để học sinh chia sẻ cặp đôi tự phát hiện dấu phẩy thập phân trước khi giáo viên chốt kiến thức.',
        createdAt: '22/09/2026 16:15'
      },
      {
        id: 'fb-3',
        teacherId: 'gv-7',
        teacherName: 'Hồ Mộng Tuyết',
        teacherClass: '5A(KB)',
        campus: 'Kiến Bình',
        aspect: 'Luyện tập',
        feedbackText: 'Phần Luyện tập cần phân hóa bài tập cho em Tâm (học sinh hòa nhập khiếm thính nhẹ). Cô Linh nên chuẩn bị sẵn thẻ số màu để em ghép vào bảng số thập phân thuận lợi hơn.',
        createdAt: '23/09/2026 09:10'
      },
      {
        id: 'fb-4',
        teacherId: 'gv-8',
        teacherName: 'Lê Thị Mai',
        teacherClass: '5B(KB)',
        campus: 'Kiến Bình',
        aspect: 'Vận dụng',
        feedbackText: 'Hoạt động Vận dụng cho học sinh đọc thông số dinh dưỡng trên hộp sữa tìm số thập phân rất thiết thực, liên hệ thực tế cao. Có thể khuyến khích các em về nhà tìm thêm trên bao bì thực phẩm.',
        createdAt: '23/09/2026 10:25'
      }
    ],
    conclusionByLeader: 'Kết luận chỉ đạo của Tổ trưởng Nguyễn Thị Bé Tý: Thống nhất kế hoạch dạy minh họa vào ngày 15/10/2026 tại lớp 5A1. Đề nghị các điểm trường sắp xếp thời gian dự giờ trực tiếp và trực tuyến.',
    status: 'Đang chuẩn bị'
  }
];

export const INITIAL_DIRECTIVES: SchoolDirective[] = [
  {
    id: 'dir-1',
    code: 'TB-01/TCM5',
    title: 'Thông báo Họp Tổ Chuyên Môn Khối 5 định kỳ tuần 4 tháng 9 & Triển khai chuyên đề',
    category: 'Lịch hội họp',
    content: `Kính gửi quý Thầy Cô trong Tổ Khối 5,
Tổ chuyên môn triệu tập phiên họp chuyên môn thường kỳ với các nội dung trọng tâm:
1. Đánh giá tình hình sĩ số và học sinh khuyết tật hòa nhập tháng 9.
2. Thống nhất ma trận, bảng đặc tả đề kiểm tra Giữa Học kỳ I (Toán, Tiếng Việt).
3. Góp ý hoàn thiện Kế hoạch bài dạy chuyên đề nghiên cứu bài học của cô Phan Thị Mỹ Linh.
4. Triển khai kế hoạch hồ sơ sổ sách và kiểm tra chuyên đề tháng 10.`,
    meetingLink: 'https://meet.google.com/abc-tanthanh-khoi5',
    meetingTime: '14h30 Thứ Năm, ngày 25/09/2026',
    meetingPasscode: 'Khoi5TanThanh',
    senderName: 'Tổ trưởng Nguyễn Thị Bé Tý',
    createdAt: '21/09/2026',
    isUrgent: true
  },
  {
    id: 'dir-2',
    code: 'CV-142/PGD-TH',
    title: 'Công văn chỉ đạo về việc tăng cường phụ đạo học sinh chưa đạt chuẩn và hỗ trợ học sinh hòa nhập',
    category: 'Công văn chỉ đạo',
    content: `Thực hiện công văn số 142 của Phòng Giáo dục và Đào tạo: Yêu cầu các trường tiểu học tuyệt đối không để học sinh ngồi nhầm lớp; lập danh mục theo dõi và giao trách nhiệm cụ thể cho giáo viên chủ nhiệm kèm cặp, giúp đỡ học sinh chưa hoàn thành nhiệm vụ học tập.`,
    senderName: 'Tổ trưởng Nguyễn Thị Bé Tý',
    createdAt: '18/09/2026',
    isUrgent: false
  },
  {
    id: 'dir-3',
    code: 'TB-02/TCM5',
    title: 'Nhắc nhở thời hạn nộp KHDH cá nhân và dự thảo đề kiểm tra GHK I',
    category: 'Thông báo chuyên môn',
    content: `Đề nghị quý Thầy Cô các lớp 5A1, 5A2, 5A3, 5A4, 5A(KB), 5B(KB), 5C(KB), 5A(TB), 5B(TB), 5A1, 5A2, 5B(TH), Lớp 5(ĐVP) hoàn tất việc tải lên thư mục đề thi trước ngày 05/10/2026 để Tổ trưởng thẩm định và bảo mật ngân hàng đề.`,
    senderName: 'Tổ trưởng Nguyễn Thị Bé Tý',
    createdAt: '22/09/2026',
    isUrgent: true
  }
];

export const INITIAL_EMULATIONS: EmulationRecord[] = [
  {
    id: 'emu-1',
    period: 'Học kỳ I',
    teacherId: 'gv-1',
    teacherName: 'Phan Thị Mỹ Linh',
    campus: 'Trường chính',
    assignedClass: '5A1(ĐC) - Tổ trưởng',
    lessonObservationsScore: '2 tiết Tốt (Thao giảng chuyên đề cấp trường)',
    recordBooksRating: 'Tốt',
    studentProgressRating: 'Tốt',
    innovationInitiative: 'Biện pháp ứng dụng Plickers và sơ đồ tư duy rèn kỹ năng toán cho HS lớp 5',
    proposedTitle: 'Chiến sĩ thi đua cơ sở',
    overallEvaluation: 'Hoàn thành Xuất sắc',
    notes: 'Tổ trưởng điều hành trách nhiệm, tích cực nghiên cứu bài học, lớp chủ nhiệm nền nếp xuất sắc.',
    evaluatedAt: '25/09/2026'
  },
  {
    id: 'emu-2',
    period: 'Học kỳ I',
    teacherId: 'gv-6',
    teacherName: 'Nguyễn Thị Bé Tý',
    campus: 'Kiến Bình',
    assignedClass: 'GV Phân hiệu Kiến Bình',
    lessonObservationsScore: 'Dự giờ đủ số tiết quy định, đánh giá công tâm',
    recordBooksRating: 'Tốt',
    studentProgressRating: 'Tốt',
    innovationInitiative: 'Giải pháp nâng cao chất lượng sinh hoạt chuyên môn theo nghiên cứu bài học liên phân hiệu',
    proposedTitle: 'Lao động Tiên tiến',
    overallEvaluation: 'Hoàn thành Tốt',
    notes: 'Chấp hành nghiêm túc quy chế chuyên môn của tổ.',
    evaluatedAt: '25/09/2026'
  },
  {
    id: 'emu-3',
    period: 'Học kỳ I',
    teacherId: 'gv-9',
    teacherName: 'Trần Công Minh',
    campus: 'Kiến Bình',
    assignedClass: '5C(KB)',
    lessonObservationsScore: 'Tiết dạy đạt Tốt',
    recordBooksRating: 'Tốt',
    studentProgressRating: 'Tốt',
    innovationInitiative: 'Dạy học tích hợp GDQPAN môn Lịch sử địa phương',
    proposedTitle: 'Lao động Tiên tiến',
    overallEvaluation: 'Hoàn thành Tốt',
    notes: 'Hoàn thành chỉ tiêu chất lượng đầu năm.',
    evaluatedAt: '25/09/2026'
  },
  {
    id: 'emu-4',
    period: 'Học kỳ I',
    teacherId: 'gv-7',
    teacherName: 'Hồ Mộng Tuyết',
    campus: 'Kiến Bình',
    assignedClass: '5A(KB)',
    lessonObservationsScore: 'Tiết dạy đạt Tốt',
    recordBooksRating: 'Tốt',
    studentProgressRating: 'Tốt',
    innovationInitiative: 'Kèm cặp học sinh khuyết tật hòa nhập đạt hiệu quả rõ rệt',
    proposedTitle: 'Lao động Tiên tiến',
    overallEvaluation: 'Hoàn thành Tốt',
    notes: 'Tận tụy yêu thương học sinh.',
    evaluatedAt: '25/09/2026'
  }
];

export const STANDARD_TIMETABLE_GRID: Record<string, string> = {
  'Sang_Thứ Hai_1': 'Sinh hoạt dưới cờ',
  'Sang_Thứ Hai_2': 'Tiếng Việt (Đọc)',
  'Sang_Thứ Hai_3': 'Toán',
  'Sang_Thứ Hai_4': 'Đạo đức',
  'Chieu_Thứ Hai_1': 'Tiếng Anh',
  'Chieu_Thứ Hai_2': 'Tin học & Công nghệ',
  'Chieu_Thứ Hai_3': 'Hoạt động trải nghiệm',

  'Sang_Thứ Ba_1': 'Toán',
  'Sang_Thứ Ba_2': 'Tiếng Việt (Viết)',
  'Sang_Thứ Ba_3': 'Lịch sử & Địa lý',
  'Sang_Thứ Ba_4': 'Khoa học',
  'Chieu_Thứ Ba_1': 'Giáo dục thể chất',
  'Chieu_Thứ Ba_2': 'Mĩ thuật',
  'Chieu_Thứ Ba_3': 'Tự học có hướng dẫn',

  'Sang_Thứ Tư_1': 'Tiếng Việt (Luyện từ & câu)',
  'Sang_Thứ Tư_2': 'Toán',
  'Sang_Thứ Tư_3': 'Tiếng Anh',
  'Sang_Thứ Tư_4': 'Âm nhạc',
  'Chieu_Thứ Tư_1': 'Tích hợp GDQP-AN / STEM',
  'Chieu_Thứ Tư_2': 'Khoa học',
  'Chieu_Thứ Tư_3': 'Phụ đạo Toán & Tiếng Việt',

  'Sang_Thứ Năm_1': 'Toán',
  'Sang_Thứ Năm_2': 'Tiếng Việt (Đọc)',
  'Sang_Thứ Năm_3': 'Lịch sử & Địa lý',
  'Sang_Thứ Năm_4': 'Giáo dục địa phương',
  'Chieu_Thứ Năm_1': 'Tiếng Anh',
  'Chieu_Thứ Năm_2': 'Giáo dục thể chất',
  'Chieu_Thứ Năm_3': 'Hoạt động trải nghiệm',

  'Sang_Thứ Sáu_1': 'Tiếng Việt (Viết)',
  'Sang_Thứ Sáu_2': 'Toán',
  'Sang_Thứ Sáu_3': 'Tiếng Anh',
  'Sang_Thứ Sáu_4': 'Tin học & Công nghệ',
  'Chieu_Thứ Sáu_1': 'Kỹ năng sống / STEM',
  'Chieu_Thứ Sáu_2': 'Ôn tập củng cố tuần',
  'Chieu_Thứ Sáu_3': 'Sinh hoạt lớp (Tổng kết tuần)'
};

export const INITIAL_TIMETABLES: ClassTimetable[] = [
  {
    id: 'tkb-1',
    teacherId: 'gv-1',
    teacherName: 'Phan Thị Mỹ Linh',
    className: '5A1(ĐC)',
    campus: 'Trường chính',
    effectiveTerm: 'Học kỳ I (Áp dụng từ Tuần 1)',
    effectiveDate: '05/09/2026',
    note: 'Học 2 buổi/ngày: Sáng 4 tiết (7h15 - 10h30), Chiều 3 tiết (13h45 - 16h10). Giáo viên biên soạn và gửi tệp Word chi tiết.',
    scheduleGrid: { ...STANDARD_TIMETABLE_GRID },
    attachedFileName: 'TKB_Lop_5A1_PhanThiMyLinh.docx',
    attachedFileSize: '38.5 KB',
    status: 'Áp dụng chính thức',
    reviewedBy: 'Tổ trưởng Nguyễn Thị Bé Tý',
    leaderFeedback: 'Đã nhận tệp Word TKB do cô Linh gửi. Sắp xếp tiết học khoa học, đúng chuẩn 32 tiết/tuần (Toán 5 tiết, Tiếng Việt 7 tiết, Tiếng Anh 4 tiết). Đã duyệt lưu hồ sơ tổ.',
    submittedAt: '02/09/2026'
  },
  {
    id: 'tkb-2',
    teacherId: 'gv-2',
    teacherName: 'Nguyễn Thị Hồng Nguyệt',
    className: '5A2(ĐC)',
    campus: 'Trường chính',
    effectiveTerm: 'Học kỳ I (Áp dụng từ Tuần 1)',
    effectiveDate: '05/09/2026',
    note: 'Học 2 buổi/ngày. Tiết GDTC và Tin học được bố trí chéo buổi với lớp 5A1 để đảm bảo phòng chức năng và sân bãi.',
    scheduleGrid: {
      ...STANDARD_TIMETABLE_GRID,
      'Chieu_Thứ Hai_1': 'Tin học & Công nghệ',
      'Chieu_Thứ Hai_2': 'Tiếng Anh',
      'Chieu_Thứ Ba_1': 'Mĩ thuật',
      'Chieu_Thứ Ba_2': 'Giáo dục thể chất'
    },
    attachedFileName: 'TKB_Lop_5A2_NguyenThiHongNguyet.docx',
    attachedFileSize: '41.2 KB',
    status: 'Áp dụng chính thức',
    reviewedBy: 'Tổ trưởng Nguyễn Thị Bé Tý',
    leaderFeedback: 'Đã nhận tệp Word TKB cô Nguyệt gửi. Phân bổ tiết chéo sân bãi rất hợp lý. Đã duyệt áp dụng.',
    submittedAt: '03/09/2026'
  },
  {
    id: 'tkb-3',
    teacherId: 'gv-7',
    teacherName: 'Hồ Mộng Tuyết',
    className: '5A(KB)',
    campus: 'Kiến Bình',
    effectiveTerm: 'Học kỳ I (Áp dụng từ Tuần 1)',
    effectiveDate: '05/09/2026',
    note: 'Điểm trường Kiến Bình học 2 buổi/ngày. Chiều Thứ Tư có tiết phụ đạo học sinh khuyết tật hòa nhập và rèn kiến thức Toán.',
    scheduleGrid: {
      ...STANDARD_TIMETABLE_GRID,
      'Chieu_Thứ Tư_3': 'Hỗ trợ HS hòa nhập & Chậm tiến bộ'
    },
    attachedFileName: 'ThoiKhoaBieu_Lop5A_KienBinh.docx',
    attachedFileSize: '42.0 KB',
    status: 'Áp dụng chính thức',
    reviewedBy: 'Tổ trưởng Nguyễn Thị Bé Tý',
    leaderFeedback: 'Đã nhận tệp Word TKB cô Tuyết gửi. Rất hoan nghênh cô đã chủ động bố trí tiết phụ đạo cho HS hòa nhập. Đã duyệt.',
    submittedAt: '04/09/2026'
  },
  {
    id: 'tkb-4',
    teacherId: 'gv-9',
    teacherName: 'Đoàn Tấn Lợi',
    className: '5A(TB)',
    campus: 'Tân Bình',
    effectiveTerm: 'Học kỳ I (Áp dụng từ Tuần 1)',
    effectiveDate: '05/09/2026',
    note: 'Điểm trường Tân Bình, giáo viên chuyên Tiếng Anh dạy liên trường vào các ngày Thứ Ba và Thứ Năm.',
    scheduleGrid: { ...STANDARD_TIMETABLE_GRID },
    attachedFileName: 'TKB_Lop5A_TanBinh_DoanTanLoi.docx',
    attachedFileSize: '39.8 KB',
    status: 'Áp dụng chính thức',
    reviewedBy: 'Tổ trưởng Nguyễn Thị Bé Tý',
    leaderFeedback: 'Đã nhận tệp Word TKB thầy Lợi gửi. Bố trí tiết Tiếng Anh phù hợp với lịch dạy liên trường. Đã duyệt.',
    submittedAt: '04/09/2026'
  },
  {
    id: 'tkb-5',
    teacherId: 'gv-11',
    teacherName: 'Nguyễn Thị Thùy',
    className: '5A1(TH)',
    campus: 'Trương Hoàng',
    effectiveTerm: 'Học kỳ I (Áp dụng từ Tuần 1)',
    effectiveDate: '05/09/2026',
    note: 'Điểm trường Trương Hoàng, học sinh học 2 buổi/ngày, đảm bảo đủ 32 tiết/tuần.',
    scheduleGrid: { ...STANDARD_TIMETABLE_GRID },
    attachedFileName: 'TKB_TruongHoang_5A1_NguyenThiThuy.docx',
    attachedFileSize: '36.4 KB',
    status: 'Áp dụng chính thức',
    reviewedBy: 'Tổ trưởng Nguyễn Thị Bé Tý',
    leaderFeedback: 'Đã nhận tệp Word TKB cô Thùy gửi. Thời khóa biểu hợp lý, đảm bảo đủ tiết theo CT 2018.',
    submittedAt: '05/09/2026'
  },
  {
    id: 'tkb-6',
    teacherId: 'gv-14',
    teacherName: 'Đỗ Văn Sơn',
    className: 'Lớp 5(ĐVP)',
    campus: 'Đặng Văn Phấn',
    effectiveTerm: 'Học kỳ I (Áp dụng từ Tuần 1)',
    effectiveDate: '05/09/2026',
    note: 'Điểm trường lẻ Đặng Văn Phấn (1 lớp ghép/lớp 5), kết hợp các tiết tự học và thực hành kỹ năng địa phương.',
    scheduleGrid: { ...STANDARD_TIMETABLE_GRID },
    attachedFileName: 'TKB_Lop5_DangVanPhan_DoVanSon.docx',
    attachedFileSize: '37.1 KB',
    status: 'Áp dụng chính thức',
    reviewedBy: 'Tổ trưởng Nguyễn Thị Bé Tý',
    leaderFeedback: 'Đã nhận tệp Word TKB thầy Sơn gửi. Đã thẩm định và duyệt áp dụng cho điểm lẻ Đặng Văn Phấn.',
    submittedAt: '05/09/2026'
  }
];

export const INITIAL_APP_SETTINGS = {
  headerTitle: 'UBND Xã Tân Thạnh – Trường Tiểu Học Tân Thạnh – Tổ Khối 5',
  schoolName: 'TRƯỜNG TIỂU HỌC TÂN THẠNH',
  teamName: 'TỔ CHUYÊN MÔN KHỐI 5',
  academicYear: 'NĂM HỌC 2026-2027',
  communeName: 'UBND XÃ TÂN THẠNH',
  secretPasswordLeader: 'Tt112233'
};
