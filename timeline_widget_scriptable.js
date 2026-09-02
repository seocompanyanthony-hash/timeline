// Timeline 中级 B班 - Scriptable widget for iPhone/iPad.
// In Scriptable: create a new script, paste this file, then choose it in a Scriptable widget.

let TZ = "Asia/Shanghai";
let ROOM = "格物楼 B408";
let APP_URL = "https://timeline.dannynguyen-ent.workers.dev/";
let GOOGLE_SHEET_CSV_URL = "";
const DAY_MS = 86400000;

const colors = {
  light: {
    bg: "#f7f8fb",
    card: "#ffffff",
    text: "#17191f",
    muted: "#687083",
    line: "#d9e0ea",
    blue: "#2563eb",
    blueSoft: "#e8f0ff",
    green: "#16834f",
    greenSoft: "#e8f7ee",
    amber: "#b76616",
    amberSoft: "#fff3df",
    rose: "#be244a",
    roseSoft: "#ffe8ee"
  },
  dark: {
    bg: "#101319",
    card: "#1b2029",
    text: "#f4f7fb",
    muted: "#aab3c3",
    line: "#313a48",
    blue: "#7aa7ff",
    blueSoft: "#182743",
    green: "#71d59a",
    greenSoft: "#17291f",
    amber: "#f0b468",
    amberSoft: "#332516",
    rose: "#ff8aa6",
    roseSoft: "#361b24"
  }
};

let subjectColors = {
  "中级汉语阅读": ["blue", "blueSoft"],
  "HSK4辅导": ["blue", "blueSoft"],
  "文化体验": ["amber", "amberSoft"],
  "中级汉语听力": ["green", "greenSoft"],
  "中级汉语综合": ["rose", "roseSoft"],
  "中级汉语写作": ["blue", "blueSoft"],
  "中级汉语口语": ["green", "greenSoft"]
};

let schedule = {
  1: [
    { start: "08:00", end: "09:30", name: "中级汉语阅读", vi: "Đọc hiểu", teacher: "王秀环" },
    { start: "09:50", end: "11:15", name: "HSK4辅导", vi: "HSK 4", teacher: "周洁" },
    { start: "PM", end: "PMEND", name: "文化体验", vi: "Văn hóa", teacher: "杨宇飞" }
  ],
  2: [
    { start: "08:00", end: "09:30", name: "中级汉语听力", vi: "Nghe", teacher: "薛立风" },
    { start: "PM", end: "PMEND", name: "中级汉语综合", vi: "Tổng hợp", teacher: "刘淑杰" }
  ],
  3: [
    { start: "08:00", end: "09:30", name: "中级汉语写作", vi: "Viết", teacher: "王文娟" },
    { start: "09:50", end: "11:15", name: "中级汉语口语", vi: "Khẩu ngữ", teacher: "梁景会" }
  ],
  4: [
    { start: "08:00", end: "09:30", name: "中级汉语综合", vi: "Tổng hợp", teacher: "刘淑杰" },
    { start: "09:50", end: "11:15", name: "中级汉语口语", vi: "Khẩu ngữ", teacher: "梁景会" }
  ],
  5: [
    { start: "08:00", end: "09:30", name: "中级汉语听力", vi: "Nghe", teacher: "薛立风" }
  ]
};

let milestones = [
  { start: "2026-09-20", end: "2026-09-20", type: "special", title: "Học theo lịch 单周周五", detail: "Ngày đặc biệt dùng lịch thứ 6." },
  { start: "2026-09-25", end: "2026-10-04", type: "holiday", title: "Nghỉ Trung thu + Quốc khánh", detail: "Không có lớp theo lịch thường." },
  { start: "2026-10-10", end: "2026-10-10", type: "special", title: "Học theo lịch 单周周五", detail: "Ngày đặc biệt dùng lịch thứ 6." },
  { start: "2026-11-09", end: "2026-11-15", type: "exam", title: "Tuần thi giữa kỳ", detail: "Kiểm tra lịch thi riêng nếu trường công bố." },
  { start: "2026-12-29", end: "2026-12-31", type: "exam", title: "Thi cuối kỳ 语言生", detail: "Mốc thi cuối kỳ theo lịch học kỳ." },
  { start: "2027-01-01", end: "2027-01-03", type: "holiday", title: "Nghỉ Tết Dương lịch", detail: "Không có lớp theo lịch thường." }
];

async function loadSharedTimelineData() {
  try {
    const request = new Request(`${APP_URL.replace(/\/$/, "")}/timeline-data.js?ts=${Date.now()}`);
    request.timeoutInterval = 3;
    const text = await request.loadString();
    const box = {};
    const loaded = Function("window", `${text}\nreturn window.TIMELINE_DATA;`)(box);
    return loaded && typeof loaded === "object" ? loaded : null;
  } catch {
    return null;
  }
}

function applySharedTimelineData(data) {
  if (!data || typeof data !== "object") return;
  if (data.timeZone) TZ = data.timeZone;
  if (data.room) ROOM = data.room;
  if (data.appUrl) APP_URL = data.appUrl;
  if (data.googleSheetCsvUrl) GOOGLE_SHEET_CSV_URL = data.googleSheetCsvUrl;
  if (data.subjectColors) subjectColors = data.subjectColors;
  if (data.schedule) schedule = data.schedule;
  if (Array.isArray(data.milestones)) milestones = data.milestones;
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }
  row.push(cell);
  rows.push(row);
  return rows.filter((items) => items.some((item) => item.trim()));
}

function csvToRecords(text) {
  const rows = parseCSV(text);
  if (!rows.length) return [];
  const headers = rows[0].map((header) => header.trim().toLowerCase());
  return rows.slice(1).map((row) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = (row[index] || "").trim();
    });
    return record;
  });
}

function recordsToTimelineData(records) {
  const nextSchedule = {};
  const nextMilestones = [];
  records.forEach((record) => {
    const kind = (record.kind || "").toLowerCase();
    if (kind === "schedule") {
      const day = Number(record.day);
      if (!day || !record.start || !record.end || !record.name) return;
      if (!nextSchedule[day]) nextSchedule[day] = [];
      nextSchedule[day].push({
        start: record.start,
        end: record.end,
        name: record.name,
        vi: record.vi || record.name,
        teacher: record.teacher || ""
      });
    }
    if (kind === "milestone") {
      const start = record.date_start || record.start;
      const end = record.date_end || record.end || start;
      if (!start || !record.title) return;
      nextMilestones.push({
        start,
        end,
        type: record.type || "special",
        title: record.title,
        detail: record.detail || ""
      });
    }
  });
  Object.keys(nextSchedule).forEach((day) => {
    nextSchedule[day].sort((a, b) => entrySort(a) - entrySort(b));
  });
  nextMilestones.sort((a, b) => a.start.localeCompare(b.start));
  return { schedule: nextSchedule, milestones: nextMilestones };
}

async function loadGoogleSheetData() {
  if (!GOOGLE_SHEET_CSV_URL) return null;
  try {
    const separator = GOOGLE_SHEET_CSV_URL.includes("?") ? "&" : "?";
    const request = new Request(`${GOOGLE_SHEET_CSV_URL}${separator}cache=${Date.now()}`);
    request.timeoutInterval = 5;
    const records = csvToRecords(await request.loadString());
    return recordsToTimelineData(records);
  } catch {
    return null;
  }
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function parts(date = new Date()) {
  const df = new DateFormatter();
  df.locale = "en_US_POSIX";
  df.timeZone = TZ;
  df.dateFormat = "yyyy-MM-dd-HH-mm-ss-E";
  const [y, m, d, h, min, sec, weekday] = df.string(date).split("-");
  const weekdays = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    y: Number(y),
    m: Number(m),
    d: Number(d),
    h: Number(h),
    min: Number(min),
    sec: Number(sec),
    dow: weekdays[weekday] ?? 0
  };
}

function today() {
  const p = parts();
  return `${p.y}-${pad(p.m)}-${pad(p.d)}`;
}

function ymdUTC(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return Date.UTC(year, month - 1, day, 12);
}

function fromUTC(ms) {
  const date = new Date(ms);
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

function addDays(dateString, amount) {
  return fromUTC(ymdUTC(dateString) + amount * DAY_MS);
}

function dayOfWeek(dateString) {
  return new Date(ymdUTC(dateString)).getUTCDay();
}

function shortDate(dateString) {
  const [, month, day] = dateString.split("-");
  return `${day}/${month}`;
}

function timeToMinutes(value) {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

function currentMinute(p) {
  return p.h * 60 + p.min + p.sec / 60;
}

function range(dateString, start, end) {
  return dateString >= start && dateString <= end;
}

function entrySort(entry) {
  if (!/^\d\d:\d\d$/.test(entry.start || "")) return 1440;
  return timeToMinutes(entry.start);
}

function special(dateString) {
  return milestones.find((item) => range(dateString, item.start, item.end)) || null;
}

function lessonsFor(dateString) {
  const marker = special(dateString);
  if (marker && (marker.type === "holiday" || marker.type === "exam")) return [];
  const dow = marker && marker.type === "special" ? 5 : dayOfWeek(dateString);
  const afternoonAfterOct = dateString >= "2026-10-01";
  return (schedule[dow] || []).map((lesson) => ({
    ...lesson,
    start: lesson.start === "PM" ? (afternoonAfterOct ? "14:00" : "14:30") : lesson.start,
    end: lesson.end === "PMEND" ? (afternoonAfterOct ? "15:25" : "15:55") : lesson.end
  }));
}

function remainingLabel(minutes) {
  const safe = Math.max(0, Math.ceil(minutes));
  if (safe < 60) return `${safe}p`;
  const hours = Math.floor(safe / 60);
  const mins = safe % 60;
  return `${hours}g${mins ? ` ${mins}p` : ""}`;
}

function nextLesson(p) {
  const dateString = `${p.y}-${pad(p.m)}-${pad(p.d)}`;
  const now = currentMinute(p);
  for (const lesson of lessonsFor(dateString)) {
    if (timeToMinutes(lesson.start) > now) {
      return { date: dateString, lesson, delta: timeToMinutes(lesson.start) - now };
    }
  }
  for (let offset = 1; offset <= 45; offset += 1) {
    const future = addDays(dateString, offset);
    const lessons = lessonsFor(future);
    if (lessons.length) {
      return { date: future, lesson: lessons[0], delta: offset * 1440 - now + timeToMinutes(lessons[0].start) };
    }
  }
  return null;
}

function activeLesson(p) {
  const dateString = `${p.y}-${pad(p.m)}-${pad(p.d)}`;
  const now = currentMinute(p);
  return lessonsFor(dateString).find((lesson) => now >= timeToMinutes(lesson.start) && now < timeToMinutes(lesson.end)) || null;
}

function addText(stack, text, size, weight = "regular", color = theme.text, limit = 1) {
  const item = stack.addText(text);
  item.font = weight === "bold" ? Font.boldSystemFont(size) : weight === "medium" ? Font.mediumSystemFont(size) : Font.systemFont(size);
  item.textColor = new Color(color);
  item.lineLimit = limit;
  item.minimumScaleFactor = 0.72;
  return item;
}

function addPill(stack, text, fg, bg) {
  const pill = stack.addStack();
  pill.backgroundColor = new Color(bg);
  pill.cornerRadius = 8;
  pill.setPadding(4, 7, 4, 7);
  addText(pill, text, 10, "bold", fg, 1);
  return pill;
}

function addDivider(stack) {
  const divider = stack.addStack();
  divider.size = new Size(0, 1);
  divider.backgroundColor = new Color(theme.line);
}

function lessonTone(lesson) {
  const keys = subjectColors[lesson?.name] || ["blue", "blueSoft"];
  return [theme[keys[0]], theme[keys[1]]];
}

function addLessonRow(parent, lesson) {
  const [fg, bg] = lessonTone(lesson);
  const row = parent.addStack();
  row.layoutHorizontally();
  row.centerAlignContent();
  row.spacing = 8;
  const time = row.addStack();
  time.size = new Size(48, 30);
  time.layoutVertically();
  addText(time, lesson.start, 10, "bold", theme.muted, 1);
  addText(time, lesson.end, 10, "bold", theme.muted, 1);
  const dot = row.addStack();
  dot.size = new Size(8, 30);
  dot.backgroundColor = new Color(fg);
  dot.cornerRadius = 4;
  const detail = row.addStack();
  detail.layoutVertically();
  addText(detail, lesson.name, 12, "bold", theme.text, 1);
  addText(detail, `${lesson.vi} · ${lesson.teacher}`, 10, "medium", theme.muted, 1);
  row.url = APP_URL;
}

function buildWidget() {
  const p = parts();
  const dateString = `${p.y}-${pad(p.m)}-${pad(p.d)}`;
  const family = config.widgetFamily || "medium";
  const active = activeLesson(p);
  const next = nextLesson(p);
  const marker = special(dateString);
  const lessons = lessonsFor(dateString);
  const widget = new ListWidget();
  widget.backgroundColor = new Color(theme.bg);
  widget.url = APP_URL;
  widget.refreshAfterDate = new Date(Date.now() + 5 * 60 * 1000);
  widget.setPadding(14, 14, 14, 14);

  const header = widget.addStack();
  header.layoutHorizontally();
  header.centerAlignContent();
  const titleBox = header.addStack();
  titleBox.layoutVertically();
  addText(titleBox, "中级 B班", family === "small" ? 13 : 14, "bold", theme.text, 1);
  addText(titleBox, `${pad(p.h)}:${pad(p.min)} · ${shortDate(dateString)}`, 10, "medium", theme.muted, 1);
  header.addSpacer();
  addPill(header, "UTC+8", theme.blue, theme.blueSoft);
  widget.addSpacer(10);

  if (active) {
    const [fg, bg] = lessonTone(active);
    addPill(widget, "ĐANG HỌC", fg, bg);
    widget.addSpacer(7);
    addText(widget, active.name, family === "small" ? 17 : 20, "bold", theme.text, 2);
    widget.addSpacer(3);
    const left = timeToMinutes(active.end) - currentMinute(p);
    addText(widget, `${active.start}-${active.end} · còn ${remainingLabel(left)}`, 11, "medium", theme.muted, 1);
  } else if (marker && (marker.type === "holiday" || marker.type === "exam")) {
    const fg = marker.type === "exam" ? theme.rose : theme.blue;
    const bg = marker.type === "exam" ? theme.roseSoft : theme.blueSoft;
    addPill(widget, marker.type === "exam" ? "THI" : "NGHỈ", fg, bg);
    widget.addSpacer(7);
    addText(widget, marker.title, family === "small" ? 17 : 20, "bold", theme.text, 2);
    widget.addSpacer(3);
    addText(widget, marker.detail, 11, "medium", theme.muted, 2);
  } else {
    addPill(widget, lessons.length ? "ĐANG NGHỈ" : "HÔM NAY", theme.blue, theme.blueSoft);
    widget.addSpacer(7);
    addText(widget, lessons.length ? "Không có tiết lúc này" : "Không có lớp", family === "small" ? 16 : 19, "bold", theme.text, 2);
    widget.addSpacer(3);
    const nextText = next ? `Tiếp: ${next.lesson.name}` : "Chưa có lịch tiếp theo";
    addText(widget, nextText, 11, "medium", theme.muted, 2);
  }

  if (family !== "small") {
    widget.addSpacer(12);
    addDivider(widget);
    widget.addSpacer(9);
    if (next) {
      const when = next.date === dateString ? "Hôm nay" : shortDate(next.date);
      addText(widget, "Tiết tiếp theo", 10, "bold", theme.muted, 1);
      widget.addSpacer(4);
      addText(widget, next.lesson.name, 14, "bold", theme.text, 1);
      addText(widget, `${when} · ${next.lesson.start}-${next.lesson.end} · ${next.lesson.teacher}`, 11, "medium", theme.muted, 1);
    }
  }

  if (family === "large" || family === "extraLarge") {
    widget.addSpacer(12);
    addText(widget, "Hôm nay", 10, "bold", theme.muted, 1);
    widget.addSpacer(7);
    if (lessons.length) {
      lessons.slice(0, 4).forEach((lesson, index) => {
        if (index) widget.addSpacer(8);
        addLessonRow(widget, lesson);
      });
    } else {
      addText(widget, marker ? marker.detail : "Không có tiết trong ngày này", 12, "medium", theme.muted, 2);
    }
  }

  widget.addSpacer();
  addText(widget, ROOM, 10, "medium", theme.muted, 1);
  return widget;
}

applySharedTimelineData(await loadSharedTimelineData());
applySharedTimelineData(await loadGoogleSheetData());

const useDark = Device.isUsingDarkAppearance();
const theme = useDark ? colors.dark : colors.light;
const widget = buildWidget();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  Script.setWidget(widget);
  const alert = new Alert();
  alert.title = "Widget đã sẵn sàng";
  alert.message = "Ra màn hình chính, thêm widget Scriptable rồi chọn script Timeline B. Nếu widget đã có sẵn, đợi iOS tự làm mới hoặc xóa/thêm lại widget.";
  alert.addAction("OK");
  await alert.presentAlert();
}
Script.complete();
