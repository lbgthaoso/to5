import React, { useState } from 'react';
import { SchoolDirective, TeacherMember } from '../types';
import { 
  BellRing, 
  Video, 
  PlusCircle, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  Clock, 
  FileText, 
  FileSpreadsheet,
  AlertTriangle, 
  ShieldCheck,
  Download
} from 'lucide-react';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { FileUploadInput } from './FileUploadInput';
import { downloadFile, detectFileType } from '../utils/fileHelpers';

interface NoticesAndDirectivesViewProps {
  directives: SchoolDirective[];
  currentUser: TeacherMember;
  onSaveDirective: (directive: SchoolDirective) => void;
  onDeleteDirective: (id: string) => void;
}

export const NoticesAndDirectivesView: React.FC<NoticesAndDirectivesViewProps> = ({
  directives,
  currentUser,
  onSaveDirective,
  onDeleteDirective
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('Tất cả');
  const [deletingDirective, setDeletingDirective] = useState<SchoolDirective | null>(null);

  const [formData, setFormData] = useState<{
    code: string;
    title: string;
    category: SchoolDirective['category'];
    content: string;
    senderName: string;
    meetingLink: string;
    meetingTime: string;
    meetingPasscode: string;
    isUrgent: boolean;
    attachedFileName: string;
    attachedFileSize: string;
    attachedFileDataUrl?: string;
  }>({
    code: '',
    title: '',
    category: 'Lịch hội họp',
    content: '',
    senderName: 'Tổ trưởng Nguyễn Thị Bé Tý',
    meetingLink: '',
    meetingTime: '',
    meetingPasscode: '',
    isUrgent: false,
    attachedFileName: '',
    attachedFileSize: '',
    attachedFileDataUrl: undefined
  });

  const filteredDirectives = directives.filter(d => {
    if (selectedFilter === 'Tất cả') return true;
    return d.category === selectedFilter;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newDirective: SchoolDirective = {
      id: 'dir-' + Date.now(),
      code: formData.code || `TB-${Date.now().toString().slice(-4)}/TCM5`,
      title: formData.title,
      category: formData.category,
      content: formData.content,
      meetingLink: formData.meetingLink || undefined,
      meetingTime: formData.meetingTime || undefined,
      meetingPasscode: formData.meetingPasscode || undefined,
      senderName: formData.senderName.trim() || 'Tổ trưởng Nguyễn Thị Bé Tý',
      createdAt: new Date().toLocaleDateString('vi-VN'),
      isUrgent: formData.isUrgent,
      attachedFileName: formData.attachedFileName || undefined,
      attachedFileSize: formData.attachedFileSize || undefined,
      attachedFileDataUrl: formData.attachedFileDataUrl
    };

    onSaveDirective(newDirective);
    setShowModal(false);
    setFormData({
      code: '',
      title: '',
      category: 'Lịch hội họp',
      content: '',
      senderName: 'Tổ trưởng Nguyễn Thị Bé Tý',
      meetingLink: '',
      meetingTime: '',
      meetingPasscode: '',
      isUrgent: false,
      attachedFileName: '',
      attachedFileSize: '',
      attachedFileDataUrl: undefined
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Thanh lệnh 6
              </span>
              <h2 className="text-xl font-bold text-slate-800">
                Công Văn Chỉ Đạo & Thông Báo Họp Tổ Chuyên Môn
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Người gửi thông báo là <strong>Tổ trưởng Nguyễn Thị Bé Tý</strong>. Gửi thông báo chuyên môn, lịch họp định kỳ, địa chỉ phòng họp trực tuyến (Google Meet/Zoom) cho giáo viên toàn tổ.
            </p>
          </div>

          {currentUser.isLeader ? (
            <button
              type="button"
              onClick={() => {
                setFormData({
                  code: '',
                  title: '',
                  category: 'Lịch hội họp',
                  content: '',
                  senderName: 'Tổ trưởng Nguyễn Thị Bé Tý',
                  meetingLink: 'https://meet.google.com/',
                  meetingTime: '14h30 Thứ Năm hàng tuần',
                  meetingPasscode: '',
                  isUrgent: false,
                  attachedFileName: '',
                  attachedFileSize: '',
                  attachedFileDataUrl: undefined
                });
                setShowModal(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-xl text-sm flex items-center gap-2 shadow-xs transition-colors shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Phát Thông Báo / Lịch Họp Mới</span>
            </button>
          ) : (
            <div className="text-xs bg-slate-100 text-slate-500 px-3 py-2 rounded-xl font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span>Người gửi thông báo: <strong>Tổ trưởng Nguyễn Thị Bé Tý</strong></span>
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-slate-100">
          {['Tất cả', 'Lịch hội họp', 'Công văn chỉ đạo', 'Thông báo chuyên môn'].map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === f
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Directives Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDirectives.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500">
            <BellRing className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold">Chưa có thông báo nào trong mục này.</p>
          </div>
        ) : (
          filteredDirectives.map((d) => {
            const isMeeting = d.meetingLink || d.meetingTime;

            return (
              <div
                key={d.id}
                className={`bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all hover:shadow-md ${
                  d.isUrgent ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {d.category}
                      </span>
                      {d.isUrgent && (
                        <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Khẩn
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">{d.code}</span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {d.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="text-xs text-slate-500">
                        Ngày ban hành: {d.createdAt}
                      </span>
                      <span className="text-xs bg-indigo-50 text-indigo-900 border border-indigo-200 px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1 shadow-2xs">
                        <span>👤 Người gửi:</span>
                        <strong>{d.senderName || 'Tổ trưởng Nguyễn Thị Bé Tý'}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                    {d.content}
                  </div>

                  {/* Meeting Box if online meeting */}
                  {isMeeting && (
                    <div className="bg-indigo-50/80 p-3 rounded-xl border border-indigo-100 text-xs space-y-2">
                      <div className="flex items-center gap-2 text-indigo-900 font-bold">
                        <Video className="w-4 h-4 text-indigo-600" />
                        <span>Phòng Họp Trực Tuyến Tổ Khối 5</span>
                      </div>
                      {d.meetingTime && (
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Thời gian: <strong>{d.meetingTime}</strong></span>
                        </div>
                      )}
                      {d.meetingPasscode && (
                        <div className="text-[11px] text-slate-500">
                          Mật mã phòng (Passcode): <strong className="font-mono text-indigo-700">{d.meetingPasscode}</strong>
                        </div>
                      )}
                      {d.meetingLink && (
                        <a
                          href={d.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-xs transition-colors"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Tham gia cuộc họp ngay</span>
                          <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      )}
                    </div>
                  )}
                  {/* Attached Word/Excel file if present */}
                  {d.attachedFileName && (() => {
                    const fileType = detectFileType(d.attachedFileName);
                    return (
                      <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                        <div className="flex items-center gap-2 overflow-hidden">
                          {fileType === 'word' ? (
                            <span className="p-1 bg-blue-100 text-blue-700 rounded font-bold text-[10px] uppercase shrink-0">Word</span>
                          ) : fileType === 'excel' ? (
                            <span className="p-1 bg-emerald-100 text-emerald-700 rounded font-bold text-[10px] uppercase shrink-0">Excel</span>
                          ) : (
                            <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                          )}
                          <div className="overflow-hidden">
                            <span className="font-semibold text-slate-800 truncate block">{d.attachedFileName}</span>
                            <span className="text-[10px] text-slate-400">{d.attachedFileSize || 'Văn bản đính kèm'}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const fallback = `TRƯỜNG TIỂU HỌC TÂN THẠNH\nTHÔNG BÁO / CÔNG VĂN: ${d.title}\nSố: ${d.code}\nNgày: ${d.createdAt}\nNgười ký: ${d.senderName}\n\n${d.content}`;
                            downloadFile(d.attachedFileName || `${d.title}.docx`, d.attachedFileDataUrl, fallback);
                          }}
                          className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 ml-2"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Tải về</span>
                        </button>
                      </div>
                    );
                  })()}
                </div>

                {/* Footer action */}
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {d.isUrgent ? 'Thông báo ưu tiên cao' : 'Thông báo định kỳ'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setDeletingDirective(d)}
                    title="Xóa thông báo gửi sai"
                    className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa thông báo</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingDirective)}
        onClose={() => setDeletingDirective(null)}
        onConfirm={() => {
          if (deletingDirective) {
            onDeleteDirective(deletingDirective.id);
            setDeletingDirective(null);
          }
        }}
        title="Xác nhận xóa Thông báo / Công văn"
        itemName={deletingDirective ? deletingDirective.title : ''}
        description="Thông báo này sẽ được xóa khỏi bảng tin của tổ khối 5."
      />

      {/* Modal: Create Directive / Notice */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Phát Thông Báo / Lịch Họp Chuyên Môn</h3>
                <p className="text-xs text-indigo-100">
                  Gửi công văn chỉ đạo và đường dẫn họp trực tuyến cho giáo viên toàn tổ
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

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Người gửi / Ban hành thông báo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.senderName}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                    className="w-full border border-indigo-300 bg-indigo-50/70 rounded-lg p-2 text-sm font-bold text-indigo-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Tổ trưởng Nguyễn Thị Bé Tý"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số hiệu văn bản
                  </label>
                  <input
                    type="text"
                    placeholder="VD: TB-03/TCM5"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Loại thông báo *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm outline-none font-medium"
                >
                  <option value="Lịch hội họp">Lịch hội họp</option>
                  <option value="Công văn chỉ đạo">Công văn chỉ đạo</option>
                  <option value="Thông báo chuyên môn">Thông báo chuyên môn</option>
                  <option value="Địa chỉ họp trực tuyến">Địa chỉ họp trực tuyến</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tiêu đề thông báo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Lịch họp sinh hoạt chuyên môn khối tuần 4 tháng 10"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nội dung chi tiết thông báo *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ghi rõ nội dung chỉ đạo, chuẩn bị hồ sơ, thành phần tham dự..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Online meeting options */}
              <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100 space-y-2.5">
                <span className="font-bold text-xs text-indigo-900 block">
                  Thông tin phòng họp trực tuyến (Nếu có họp Google Meet / Zoom):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Thời gian họp (VD: 14h30 Thứ Năm)"
                    value={formData.meetingTime}
                    onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
                    className="border border-slate-300 rounded-lg p-1.5 text-xs bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Mật khẩu / Passcode (nếu có)"
                    value={formData.meetingPasscode}
                    onChange={(e) => setFormData({ ...formData, meetingPasscode: e.target.value })}
                    className="border border-slate-300 rounded-lg p-1.5 text-xs bg-white"
                  />
                </div>
                <input
                  type="url"
                  placeholder="Đường link họp trực tuyến (VD: https://meet.google.com/...)"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-1.5 text-xs bg-white font-mono"
                />
              </div>

              <div>
                <FileUploadInput
                  label="Văn bản / Kế hoạch đính kèm (Word .docx hoặc Excel .xlsx)"
                  helperText="Tùy chọn tải lên văn bản chỉ đạo Word (.docx, .doc), bảng lịch họp Excel (.xlsx, .xls) hoặc PDF (.pdf)"
                  currentFileName={formData.attachedFileName}
                  currentFileSize={formData.attachedFileSize}
                  currentFileDataUrl={formData.attachedFileDataUrl}
                  onFileSelected={({ fileName, fileSize, fileDataUrl }) => {
                    setFormData(prev => ({
                      ...prev,
                      attachedFileName: fileName,
                      attachedFileSize: fileSize,
                      attachedFileDataUrl: fileDataUrl,
                      title: prev.title || fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')
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

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="urgentNotice"
                  checked={formData.isUrgent}
                  onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <label htmlFor="urgentNotice" className="text-xs text-red-700 font-bold cursor-pointer">
                  Đánh dấu đây là thông báo KHẨN
                </label>
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
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow transition-colors"
                >
                  Phát Thông Báo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
