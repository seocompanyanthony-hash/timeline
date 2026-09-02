# Deploy Timeline B len Cloudflare Pages

App nay la static HTML/PWA, khong can build, khong can server rieng.

## Cach nen dung: GitHub + Cloudflare Pages

### 1. Tao GitHub repository

Vao https://repo.new va tao repo moi, vi du `timeline-b`.

### 2. Push code len GitHub

Chay trong thu muc nay:

```bash
cd /Users/dannynguyen2xx/TKB
git init
git remote add origin https://github.com/<ten-github-cua-ban>/timeline-b.git
git add .
git commit -m "Initial Timeline B app"
git branch -M main
git push -u origin main
```

File `ip.rtf` da nam trong `.gitignore`, nen se khong bi day len repo moi.

### 3. Tao Cloudflare Pages project

Trong Cloudflare Dashboard:

1. Vao `Workers & Pages`.
2. Chon `Create application`.
3. Chon `Pages`.
4. Chon `Connect to Git`.
5. Chon repo `timeline-b`.
6. Cau hinh:

```text
Framework preset: None
Production branch: main
Build command: exit 0
Build output directory: /
Root directory: de trong
Environment variables: khong can
```

Sau do bam `Save and Deploy`.

### 4. Cap nhat appUrl sau khi deploy

Cloudflare se tao link dang:

```text
https://timeline-b.pages.dev/
```

Mo `timeline-data.js`, doi:

```js
appUrl: "http://192.168.0.213:8000/",
```

thanh:

```js
appUrl: "https://timeline-b.pages.dev/",
```

Sau do commit va push lai:

```bash
git add timeline-data.js
git commit -m "Use Cloudflare Pages app URL"
git push
```

### 5. Cai tren iPhone/iPad

Mo link Cloudflare bang Safari, bam Share, chon `Add to Home Screen`.

Neu dung widget Scriptable, mo:

```text
https://timeline-b.pages.dev/widget_setup.html
```

roi copy lai ma widget moi vao Scriptable.

## Cach test nhanh: Direct Upload

Neu chua muon tao GitHub repo:

1. Vao `Workers & Pages`.
2. Chon `Create application`.
3. Chon `Pages`.
4. Chon `Upload assets`.
5. Keo tha thu muc deploy vao dashboard.

Luu y: voi Direct Upload, Cloudflare khong cho doi sang Git integration tren cung project sau nay. Neu muon tu dong deploy bang Git, nen tao project bang Git integration ngay tu dau.
