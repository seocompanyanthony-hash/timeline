# Huong dan sua lich Timeline B

File can sua la `timeline-data.js`.

## Doi tiet hoc hang tuan

Trong `schedule`:

- `1` la Thu 2
- `2` la Thu 3
- `3` la Thu 4
- `4` la Thu 5
- `5` la Thu 6

Moi tiet hoc co dang:

```js
{ start: "08:00", end: "09:30", name: "中级汉语阅读", vi: "Đọc hiểu Trung cấp", teacher: "王秀环" }
```

Y nghia:

- `start`: gio bat dau
- `end`: gio ket thuc
- `name`: ten mon hien tren app/widget
- `vi`: ten tieng Viet ngan
- `teacher`: giao vien

Tiet chieu co the de:

```js
{ start: "PM", end: "PMEND", name: "文化体验", vi: "Trải nghiệm văn hóa", teacher: "杨宇飞" }
```

App se tu tinh: truoc ngay 01/10 hoc 14:30-15:55, tu 01/10 hoc 14:00-15:25.

## Doi ngay nghi, ngay thi, ngay dac biet

Sua trong `milestones`:

```js
{ start: "2026-09-25", end: "2026-10-04", type: "holiday", title: "Nghỉ Trung thu + Quốc khánh", detail: "Không có lớp theo lịch thường." }
```

`type` co the dung:

- `holiday`: ngay nghi
- `exam`: ngay thi
- `special`: ngay hoc theo lich dac biet

## Sau khi sua

Reload app timeline tren Safari. Neu da them ra Home Screen thi dong app roi mo lai.

Widget Scriptable se tu lay lich moi khi server tren Mac dang mo. Neu widget chua doi, mo Scriptable chay lai script `Timeline B`, hoac xoa/them lai widget.

## Dung Google Sheet de sua lich

Duoc. Cach de lam:

1. Mo file `google-sheet-template.csv`.
2. Import file do vao Google Sheets.
3. Sua cac dong trong Google Sheets.
4. Trong Google Sheets, dung `File > Share > Publish to web`, chon dang CSV.
5. Copy link CSV va dan vao `googleSheetCsvUrl` trong `timeline-data.js`.

Vi du:

```js
googleSheetCsvUrl: "https://docs.google.com/spreadsheets/d/e/.../pub?output=csv",
```

Sau do reload app timeline. Widget se lay du lieu moi khi co mang va server/app URL truy cap duoc. Neu widget khong doi ngay, chay lai script trong Scriptable hoac copy lai script tu `widget_setup.html`.
