import React, { useState } from 'react';
import { EmulationRecord, TeacherMember } from '../types';
import { 
  Award, 
  PlusCircle, 
  Trash2, 
  Printer, 
  Edit3, 
  Medal, 
  Star, 
  CheckCircle2, 
  ShieldCheck,
  FileSpreadsheet,
  FileText,
  Download
} from 'lucide-react';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { FileUploadInput } from './FileUploadInput';
import { downloadFile, detectFileType } from '../utils/fileHelpers';

interface EmulationEvaluationViewProps {
  records: EmulationRecord[];
  members: TeacherMember[];
  currentUser: TeacherMember;
  onSaveRecord: (record: EmulationRecord) => void;
  onDeleteRecord: (id: string) => void;
}

const PERIODS: EmulationRecord['period'][] = ['Học kỳ I', 'Học kỳ II', 'Cả năm'];

export const EmulationEvaluationView: React.FC<EmulationEvaluationViewProps> = ({
  records,
  members,
  currentUser,
  onSaveRecord,
  onDeleteRecord
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<EmulationRecord['period']>('Học kỳ I');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<EmulationRecord | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<EmulationRecord | null>(null);

  const [formData, setFormData] = useState<{
    teacherId: string;
    lessonObservationsScore: string;
    recordBooksRating: 'Tốt' | 'Khá' | 'Đạt';
    studentProgressRating: 'Tốt' | 'Khá' | 'Đạt';
    innovationInitiative: string;
    proposedTitle: EmulationRecord['proposedTitle'];
    overallEvaluation: EmulationRecord['overallEvaluation'];
    notes: string;
    attachedFileName: string;
    attachedFileSize: string;
    attachedFileDataUrl?: string;
  }>({
    teacherId: members[0]?.id || '',
    lessonObservationsScore: 'Tiết dạy đạt Tốt',
    recordBooksRating: 'Tốt',
    studentProgressRating: 'Tốt',
    innovationInitiative: '',
    proposedTitle: 'Lao động Tiên tiến',
    overallEvaluation: 'Hoàn thành Tốt',
    notes: '',
    attachedFileName: '',
    attachedFileSize: '',
    attachedFileDataUrl: undefined
  });

  const periodRecords = records.filter(r => r.period === selectedPeriod);

  const countExcellent = periodRecords.filter(r => r.overallEvaluation === 'Hoàn thành Xuất sắc').length;
  const countGood = periodRecords.filter(r => r.overallEvaluation === 'Hoàn thành Tốt').length;
  const countGrassroots = periodRecords.filter(r => r.proposedTitle === 'Chiến sĩ thi đua cơ sở').length;

  const handleExportExcel = () => {
    let csv = `\uFEFFTRƯỜNG TIỂU HỌC TÂN THẠNH - TỔ CHUYÊN MÔN KHỐI 5\n`;
    csv += `BẢNG TỔNG HỢP KẾT QUẢ ĐÁNH GIÁ THI ĐUA - ${selectedPeriod.toUpperCase()}\n`;
    csv += `Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}\n\n`;
    csv += `STT,Họ và tên giáo viên,Lớp phụ trách,Điểm trường,Giờ dạy thao giảng,Hồ sơ sổ sách,Chất lượng HS,Sáng kiến kinh nghiệm / Đổi mới,Danh hiệu đề xuất,Xếp loại chung,Ghi chú của Tổ trưởng\n`;
    periodRecords.forEach((r, idx) => {
      csv += `${idx + 1},"${r.teacherName}","${r.assignedClass}","${r.campus}","${r.lessonObservationsScore}","${r.recordBooksRating}","${r.studentProgressRating}","${(r.innovationInitiative || '').replace(/"/g, '""')}","${r.proposedTitle}","${r.overallEvaluation}","${(r.notes || '').replace(/"/g, '""')}"\n`;
    });
    downloadFile(`BangThiDua_${selectedPeriod.replace(/\s+/g, '_')}_Khoi5.xlsx`, undefined, csv);
  };

  const handleExportWord = () => {
    let doc = `TRƯỜNG TIỂU HỌC TÂN THẠNH - TỔ KHỐI 5\n`;
    doc += `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n\n`;
    doc += `BIÊN BẢN HỌP BÌNH XÉT THI ĐUA TỔ VIÊN KHỐI 5\n`;
    doc += `Thời gian: ${new Date().toLocaleDateString('vi-VN')} - Kỳ đánh giá: ${selectedPeriod}\n\n`;
    doc += `1. TỔNG HỢP KẾT QUẢ:\n`;
    doc += `- Tổng số giáo viên: ${periodRecords.length} đồng chí\n`;
    doc += `- Hoàn thành Xuất sắc: ${countExcellent} đồng chí\n`;
    doc += `- Hoàn thành Tốt: ${countGood} đồng chí\n`;
    doc += `- Đề nghị danh hiệu Chiến sĩ thi đua cơ sở: ${countGrassroots} đồng chí\n\n`;
    doc += `2. KẾT QUẢ ĐÁNH GIÁ TỪNG THÀNH VIÊN:\n`;
    periodRecords.forEach((r, idx) => {
      doc += `${idx + 1}. Đồng chí: ${r.teacherName} (${r.assignedClass} - ${r.campus})\n`;
      doc += `   - Tiết dạy / Thao giảng: ${r.lessonObservationsScore}\n`;
      doc += `   - Hồ sơ sổ sách: ${r.recordBooksRating} | Chất lượng học sinh: ${r.studentProgressRating}\n`;
      doc += `   - Sáng kiến / Biện pháp đổi mới: ${r.innovationInitiative || 'Không'}\n`;
      doc += `   - Danh hiệu đề xuất: ${r.proposedTitle}\n`;
      doc += `   - Đánh giá chung: ${r.overallEvaluation}\n`;
      doc += `   - Nhận xét: ${r.notes}\n\n`;
    });
    downloadFile(`BienBanThiDua_${selectedPeriod.replace(/\s+/g, '_')}_Khoi5.docx`, undefined, doc);
  };

  const handleOpenModal = (record?: EmulationRecord) => {
    if (record) {
      setEditingRecord(record);
      setFormData({
        teacherId: record.teacherId,
        lessonObservationsScore: record.lessonObservationsScore,
        recordBooksRating: record.recordBooksRating,
        studentProgressRating: record.studentProgressRating,
        innovationInitiative: record.innovationInitiative,
        proposedTitle: record.proposedTitle,
        overallEvaluation: record.overallEvaluation,
        notes: record.notes,
        attachedFileName: record.attachedFileName || '',
        attachedFileSize: record.attachedFileSize || '',
        attachedFileDataUrl: record.attachedFileDataUrl
      });
    } else {
      setEditingRecord(null);
      // Auto pick a member that does not have evaluation in this period yet
      const evaluatedTeacherIds = new Set(periodRecords.map(r => r.teacherId));
      const unevaluated = members.find(m => !evaluatedTeacherIds.has(m.id)) || members[0];

      setFormData({
        teacherId: unevaluated.id,
        lessonObservationsScore: 'Tiết dạy đạt loại Tốt',
        recordBooksRating: 'Tốt',
        studentProgressRating: 'Tốt',
        innovationInitiative: 'Ứng dụng phương pháp dạy học tích cực',
        proposedTitle: 'Lao động Tiên tiến',
        overallEvaluation: 'Hoàn thành Tốt',
        notes: 'Chấp hành tốt quy chế chuyên môn của tổ và nhà trường.',
        attachedFileName: '',
        attachedFileSize: '',
        attachedFileDataUrl: undefined
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = members.find(m => m.id === formData.teacherId) || members[0];

    const record: EmulationRecord = {
      id: editingRecord ? editingRecord.id : 'emu-' + Date.now(),
      period: selectedPeriod,
      teacherId: teacher.id,
      teacherName: teacher.name,
      campus: teacher.campus,
      assignedClass: teacher.assignedClass,
      lessonObservationsScore: formData.lessonObservationsScore,
      recordBooksRating: formData.recordBooksRating,
      studentProgressRating: formData.studentProgressRating,
      innovationInitiative: formData.innovationInitiative,
      proposedTitle: formData.proposedTitle,
      overallEvaluation: formData.overallEvaluation,
      notes: formData.notes,
      evaluatedAt: new Date().toLocaleDateString('vi-VN'),
      attachedFileName: formData.attachedFileName || undefined,
      attachedFileSize: formData.attachedFileSize || undefined,
      attachedFileDataUrl: formData.attachedFileDataUrl
    };

    onSaveRecord(record);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-100 text-yellow-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Thanh lệnh 7
              </span>
              <h2 className="text-xl font-bold text-slate-800">
                Thông Báo Kết Quả Xét Thi Đua Tổ Viên Khối 5
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tổ trưởng công bố kết quả bình xét thi đua của từng thành viên trong tổ (HKI, HKII, Cả năm). Sai Tổ trưởng có quyền chỉnh sửa / xóa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {currentUser.isLeader ? (
              <button
                type="button"
                onClick={() => handleOpenModal()}
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-xl text-sm flex items-center gap-2 shadow-xs transition-colors shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Xét Thi Đua Thành Viên ({selectedPeriod})</span>
              </button>
            ) : (
              <div className="text-xs bg-slate-100 text-slate-500 px-3 py-2 rounded-xl font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Quyền nhập kết quả thuộc về Tổ trưởng</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleExportExcel}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-2 rounded-xl text-sm flex items-center gap-1.5 shadow-xs transition-colors"
              title="Xuất bảng tổng hợp kết quả thi đua ra tệp Excel (.xlsx)"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Xuất Excel</span>
            </button>
            <button
              type="button"
              onClick={handleExportWord}
              className="bg-blue-800 hover:bg-blue-900 text-white font-medium px-3 py-2 rounded-xl text-sm flex items-center gap-1.5 shadow-xs transition-colors"
              title="Xuất biên bản bình xét thi đua ra tệp Word (.docx)"
            >
              <FileText className="w-4 h-4" />
              <span>Xuất Word</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-2 rounded-xl text-sm flex items-center gap-1.5 border border-slate-300"
            >
              <Printer className="w-4 h-4" />
              <span>In Bảng Thi Đua</span>
            </button>
          </div>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Kỳ bình xét:
          </span>
          {PERIODS.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setSelectedPeriod(p)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedPeriod === p
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Emulation KPI summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Đã xét ({selectedPeriod})</span>
          <div className="text-2xl font-black text-slate-800 mt-1">
            {periodRecords.length} / {members.length} <span className="text-xs text-slate-400 font-normal">GV</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Hoàn thành Xuất sắc</span>
          <div className="text-2xl font-black text-amber-600 mt-1 flex items-center gap-1">
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            {countExcellent}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Hoàn thành Tốt</span>
          <div className="text-2xl font-black text-blue-600 mt-1">
            {countGood}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Đề nghị CSTĐ Cơ sở</span>
          <div className="text-2xl font-black text-emerald-600 mt-1 flex items-center gap-1">
            <Medal className="w-5 h-5 text-emerald-600" />
            {countGrassroots}
          </div>
        </div>
      </div>

      {/* Emulation Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            Bảng Tổng Hợp Kết Quả Xét Thi Đua - {selectedPeriod}
          </h3>
          <span className="text-xs text-slate-500">
            Căn cứ kết quả hồ sơ, thao giảng và chất lượng lớp
          </span>
        </div>

        {periodRecords.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <Award className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <p className="font-medium">Chưa có kết quả xét thi đua cho {selectedPeriod}.</p>
            <p className="text-xs text-slate-400 mt-1">
              Tổ trưởng bấm nút &ldquo;Xét Thi Đua Thành Viên ({selectedPeriod})&rdquo; để bắt đầu nhập.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4">Họ và tên GV</th>
                  <th className="py-3 px-3">Lớp & Điểm trường</th>
                  <th className="py-3 px-3">Giờ dạy / Dự giờ</th>
                  <th className="py-3 px-3 text-center">Hồ sơ</th>
                  <th className="py-3 px-3 text-center">Chất lượng</th>
                  <th className="py-3 px-4">Sáng kiến / Đổi mới</th>
                  <th className="py-3 px-3">Danh hiệu đề xuất</th>
                  <th className="py-3 px-3 text-center">Xếp loại chung</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {periodRecords.map((r) => {
                  const isExcellent = r.overallEvaluation === 'Hoàn thành Xuất sắc';

                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {r.teacherName}
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-slate-800">{r.assignedClass}</div>
                        <span className="text-xs text-slate-500">{r.campus}</span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-700">
                        {r.lessonObservationsScore}
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-block bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded text-xs">
                          {r.recordBooksRating}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-block bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded text-xs">
                          {r.studentProgressRating}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs">
                        <p className="line-clamp-2">{r.innovationInitiative || 'Đổi mới phương pháp dạy học'}</p>
                        {r.attachedFileName && (() => {
                          const type = detectFileType(r.attachedFileName);
                          return (
                            <div className="mt-1.5 pt-1 border-t border-slate-100 flex items-center justify-between">
                              <button
                                type="button"
                                onClick={() => {
                                  const fallback = `BÁO CÁO THÀNH TÍCH / SÁNG KIẾN KINH NGHIỆM\nGiáo viên: ${r.teacherName} (${r.assignedClass})\nKỳ đánh giá: ${r.period}\nSáng kiến: ${r.innovationInitiative}\nDanh hiệu: ${r.proposedTitle}\nXếp loại: ${r.overallEvaluation}\nNhận xét: ${r.notes}`;
                                  downloadFile(r.attachedFileName || `BaoCao_${r.teacherName}.docx`, r.attachedFileDataUrl, fallback);
                                }}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 hover:text-amber-950 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                                title="Tải tệp SKKN / Báo cáo thành tích"
                              >
                                {type === 'excel' ? (
                                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                                )}
                                <span className="max-w-[120px] truncate">{r.attachedFileName}</span>
                                <Download className="w-3 h-3 ml-0.5" />
                              </button>
                            </div>
                          );
                        })()}
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-amber-900">
                        {r.proposedTitle}
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                            isExcellent
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-blue-100 text-blue-900'
                          }`}
                        >
                          {isExcellent && <Star className="w-3 h-3 fill-amber-500 text-amber-500" />}
                          {r.overallEvaluation}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleOpenModal(r)}
                          className="text-blue-600 hover:text-blue-800 font-bold text-xs px-2 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingRecord(r)}
                          title="Tổ trưởng xóa kết quả xét thi đua khi ghi sai"
                          className="text-red-600 hover:text-red-800 font-bold text-xs px-2 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Xóa</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingRecord)}
        onClose={() => setDeletingRecord(null)}
        onConfirm={() => {
          if (deletingRecord) {
            onDeleteRecord(deletingRecord.id);
            setDeletingRecord(null);
          }
        }}
        title="Xác nhận xóa Kết quả Thi đua"
        itemName={deletingRecord ? `Kết quả thi đua của ${deletingRecord.teacherName} (${deletingRecord.period})` : ''}
        description="Bản ghi kết quả xét thi đua này sẽ bị xóa khỏi bảng tổng hợp."
      />

      {/* Modal: Evaluate Teacher */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">
                  {editingRecord ? 'Chỉnh Sửa Kết Quả Thi Đua' : `Xét Thi Đua - ${selectedPeriod}`}
                </h3>
                <p className="text-xs text-amber-100">
                  Tổ trưởng bình xét xếp loại và danh hiệu cho thành viên tổ
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chọn thành viên tổ *
                </label>
                <select
                  value={formData.teacherId}
                  onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm font-semibold outline-none"
                >
                  {members.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} - {m.assignedClass} ({m.campus})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hồ sơ sổ sách
                  </label>
                  <select
                    value={formData.recordBooksRating}
                    onChange={(e) => setFormData({ ...formData, recordBooksRating: e.target.value as any })}
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm outline-none"
                  >
                    <option value="Tốt">Tốt</option>
                    <option value="Khá">Khá</option>
                    <option value="Đạt">Đạt</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Chất lượng học sinh
                  </label>
                  <select
                    value={formData.studentProgressRating}
                    onChange={(e) => setFormData({ ...formData, studentProgressRating: e.target.value as any })}
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm outline-none"
                  >
                    <option value="Tốt">Tốt</option>
                    <option value="Khá">Khá</option>
                    <option value="Đạt">Đạt</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Giờ dạy thao giảng / Dự giờ
                </label>
                <input
                  type="text"
                  placeholder="VD: 2 tiết Tốt (Thao giảng cụm trường)"
                  value={formData.lessonObservationsScore}
                  onChange={(e) => setFormData({ ...formData, lessonObservationsScore: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sáng kiến / Đổi mới phương pháp giảng dạy
                </label>
                <input
                  type="text"
                  placeholder="VD: Ứng dụng CNTT và sơ đồ tư duy môn Lịch sử 5"
                  value={formData.innovationInitiative}
                  onChange={(e) => setFormData({ ...formData, innovationInitiative: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Xếp loại đánh giá chung *
                  </label>
                  <select
                    value={formData.overallEvaluation}
                    onChange={(e) => setFormData({ ...formData, overallEvaluation: e.target.value as any })}
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm font-bold text-amber-900 outline-none"
                  >
                    <option value="Hoàn thành Xuất sắc">Hoàn thành Xuất sắc</option>
                    <option value="Hoàn thành Tốt">Hoàn thành Tốt</option>
                    <option value="Hoàn thành">Hoàn thành nhiệm vụ</option>
                    <option value="Chưa hoàn thành">Chưa hoàn thành nhiệm vụ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Danh hiệu đề xuất
                  </label>
                  <select
                    value={formData.proposedTitle}
                    onChange={(e) => setFormData({ ...formData, proposedTitle: e.target.value as any })}
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm outline-none"
                  >
                    <option value="Lao động Tiên tiến">Lao động Tiên tiến</option>
                    <option value="Chiến sĩ thi đua cơ sở">Chiến sĩ thi đua cơ sở</option>
                    <option value="Giấy khen UBND huyện">Giấy khen UBND huyện</option>
                    <option value="Hoàn thành tốt NV">Hoàn thành tốt NV</option>
                    <option value="Hoàn thành NV">Hoàn thành NV</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ghi chú nhận xét của Tổ trưởng
                </label>
                <textarea
                  rows={2}
                  placeholder="Ghi rõ ý thức tổ chức kỷ luật, đoàn kết nội bộ..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm outline-none"
                />
              </div>

              <div>
                <FileUploadInput
                  label="Tệp đính kèm Báo cáo thành tích / SKKN (Word .docx hoặc Excel .xlsx)"
                  helperText="Tải lên tệp báo cáo thành tích (Word .docx, .doc), bảng thống kê minh chứng (Excel .xlsx, .xls) hoặc tệp PDF"
                  currentFileName={formData.attachedFileName}
                  currentFileSize={formData.attachedFileSize}
                  currentFileDataUrl={formData.attachedFileDataUrl}
                  onFileSelected={({ fileName, fileSize, fileDataUrl }) => {
                    setFormData(prev => ({
                      ...prev,
                      attachedFileName: fileName,
                      attachedFileSize: fileSize,
                      attachedFileDataUrl: fileDataUrl
                    }));
                  }}
                  onFileCleared={() => {
                    setFormData(prev => ({
                      ...prev,
                      attachedFileName: '',
                      attachedFileSize: '',
                      attachedFileDataUrl: undefined
                    }));
                  }}
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-xl text-sm"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm shadow transition-colors"
                >
                  Lưu Kết Quả
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
