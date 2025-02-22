# 4 択問題アプリ

## 概要

このプロジェクトは 4 択問題を実装した個人開発用のアプリケーションです。実プロジェクトをベースに、学習・実験用として簡略化して作成されています。問題データは Google Sheets から取得し、ユーザーに対してランダムに出題される仕組みになっています。

## 主な使用技術

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Google Sheets API
- ESLint
- Prettier

## 機能

- 4 択問題の出題・回答
- 正誤判定とフィードバック表示
- スコア管理と合否判定
- Google Sheets からの問題データ取得
- レスポンシブデザイン対応
- プログレスバーによる進捗表示

※ 実プロジェクトでは以下の機能も実装しています：

- Supabase を使用した回答データの保存
- 管理画面機能

## 必要な環境

- Node.js 18.x 以上
- npm または yarn

## 環境構築

### 1. リポジトリのクローン

bash
git clone [repository-url]
cd [project-name]

### 2. 依存関係のインストール

bash
npm install
または
yarn install

### 3. 環境変数の設定

`.env.local`ファイルをプロジェクトのルートディレクトリに作成し、以下の環境変数を設定してください：

NEXT_PUBLIC_API_URL=http://localhost:3000/api/sheet
GOOGLE_CLIENT_EMAIL=your-service-account-email
GOOGLE_PRIVATE_KEY=your-private-key
SPREADSHEET_ID=your-spreadsheet-id

## 利用可能なコマンド

```bash
# 開発サーバーの起動
npm run dev

# プロダクションビルド & 起動
npm run build
npm run start

# リントチェック
npm run lint
```

その他のコマンドについては package.json をご参照ください。

## ディレクトリ構成

src/
├── app/
│ ├── api/
│ │ └── sheet/ # Google Sheets API 関連
│ │ └── components/
│ │ └── quiz/ # クイズ関連コンポーネント
│ ├── quiz/ # クイズページ
│ ├── result/ # 結果ページ
│ ├── layout.tsx # レイアウト設定
│ └── page.tsx # トップページ
├── types/ # 型定義
└── utils/ # ユーティリティ関数
public/
└── quizData.json # ローカルテスト用データ

## Google Sheets API の設定

1. Google Cloud Platform でプロジェクトを作成
2. Google Sheets API を有効化
3. サービスアカウントを作成し、認証情報を取得
4. スプレッドシートにサービスアカウントのメールアドレスを共有者として追加
5. スプレッドシート ID を環境変数に設定

## 開発者向け情報

- コードフォーマットは Prettier を使用
- ESLint による静的コード解析を実施
- Tailwind CSS によるスタイリング
- Next.js 14 の App Router を採用

## ライセンス

MIT
