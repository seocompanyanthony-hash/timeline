// Du lieu lich hoc dung chung cho app timeline va widget.
// Cach sua nhanh:
// - schedule: 1 = Thu 2, 2 = Thu 3, 3 = Thu 4, 4 = Thu 5, 5 = Thu 6.
// - Moi tiet gom start, end, name, vi, teacher.
// - Tiet chieu co the de start: "PM", end: "PMEND"; app tu doi 14:30 truoc 01/10 va 14:00 tu 01/10.
// - milestones dung cho ngay nghi, thi, hoac ngay hoc theo lich dac biet.
// - Neu muon sua lich bang Google Sheet: publish sheet dang CSV va dan link vao googleSheetCsvUrl.
window.TIMELINE_DATA = {
  timeZone: "Asia/Shanghai",
  room: "格物楼 B408",
  appUrl: "http://192.168.0.213:8000/",
  googleSheetCsvUrl: "",
  palette: {
    "中级汉语阅读": ["#2563eb", "#e8f0ff"],
    "HSK4辅导": ["#6751d7", "#efecff"],
    "文化体验": ["#b76616", "#fff3df"],
    "中级汉语听力": ["#087f83", "#e3f7f7"],
    "中级汉语综合": ["#be244a", "#ffe8ee"],
    "中级汉语写作": ["#7c3aed", "#f1ebff"],
    "中级汉语口语": ["#16834f", "#e8f7ee"],
    "note": ["#334155", "#f1f5f9"],
    "holiday": ["#6751d7", "#efecff"],
    "exam": ["#be244a", "#ffe8ee"],
    "special": ["#b76616", "#fff3df"]
  },
  subjectColors: {
    "中级汉语阅读": ["blue", "blueSoft"],
    "HSK4辅导": ["blue", "blueSoft"],
    "文化体验": ["amber", "amberSoft"],
    "中级汉语听力": ["green", "greenSoft"],
    "中级汉语综合": ["rose", "roseSoft"],
    "中级汉语写作": ["blue", "blueSoft"],
    "中级汉语口语": ["green", "greenSoft"]
  },
  schedule: {
    1: [
      { start: "08:00", end: "09:30", name: "中级汉语阅读", vi: "Đọc hiểu Trung cấp", teacher: "王秀环" },
      { start: "09:50", end: "11:15", name: "HSK4辅导", vi: "Luyện HSK 4", teacher: "周洁" },
      { start: "PM", end: "PMEND", name: "文化体验", vi: "Trải nghiệm văn hóa", teacher: "杨宇飞" }
    ],
    2: [
      { start: "08:00", end: "09:30", name: "中级汉语听力", vi: "Nghe Trung cấp", teacher: "薛立风" },
      { start: "PM", end: "PMEND", name: "中级汉语综合", vi: "Hán ngữ tổng hợp", teacher: "刘淑杰" }
    ],
    3: [
      { start: "08:00", end: "09:30", name: "中级汉语写作", vi: "Viết Trung cấp", teacher: "王文娟" },
      { start: "09:50", end: "11:15", name: "中级汉语口语", vi: "Khẩu ngữ Trung cấp", teacher: "梁景会" }
    ],
    4: [
      { start: "08:00", end: "09:30", name: "中级汉语综合", vi: "Hán ngữ tổng hợp", teacher: "刘淑杰" },
      { start: "09:50", end: "11:15", name: "中级汉语口语", vi: "Khẩu ngữ Trung cấp", teacher: "梁景会" }
    ],
    5: [
      { start: "08:00", end: "09:30", name: "中级汉语听力", vi: "Nghe Trung cấp", teacher: "薛立风" }
    ]
  },
  milestones: [
    { start: "2026-09-20", end: "2026-09-20", type: "special", title: "Học theo lịch 单周周五", detail: "Ngày đặc biệt dùng lịch thứ 6." },
    { start: "2026-09-25", end: "2026-10-04", type: "holiday", title: "Nghỉ Trung thu + Quốc khánh", detail: "Không có lớp theo lịch thường." },
    { start: "2026-10-10", end: "2026-10-10", type: "special", title: "Học theo lịch 单周周五", detail: "Ngày đặc biệt dùng lịch thứ 6." },
    { start: "2026-11-09", end: "2026-11-15", type: "exam", title: "Tuần thi giữa kỳ", detail: "Kiểm tra lịch thi riêng nếu trường công bố." },
    { start: "2026-12-29", end: "2026-12-31", type: "exam", title: "Thi cuối kỳ 语言生", detail: "Mốc thi cuối kỳ theo lịch học kỳ." },
    { start: "2027-01-01", end: "2027-01-03", type: "holiday", title: "Nghỉ Tết Dương lịch", detail: "Không có lớp theo lịch thường." }
  ]
};
