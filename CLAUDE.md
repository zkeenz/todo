# Todo App

React + Vite + TypeScript + Tailwind CSS で作ったシンプルな Todo アプリ。

## 技術スタック
- React 19 + TypeScript
- Vite（ビルドツール・開発サーバー）
- Tailwind CSS v4（@tailwindcss/vite プラグイン経由）

## 機能
- Todo の追加・完了・削除・編集（ダブルクリックで編集）
- フィルタ：すべて / 未完了 / 完了済み
- 一括切替・完了済み一括削除
- localStorage で永続化
- ダークモード対応（OS 設定に連動）

## ファイル構成
- `src/types.ts` — 型定義（Todo, Filter）
- `src/useTodos.ts` — Todo ロジックのカスタムフック
- `src/TodoItem.tsx` — 個々の Todo アイテムコンポーネント
- `src/App.tsx` — メイン UI

## デプロイ
- GitHub: https://github.com/zkeenz/todo
- GitHub Pages: https://zkeenz.github.io/todo/
- master ブランチに push すると GitHub Actions で自動デプロイ

## 開発コマンド
```bash
npm run dev    # 開発サーバー起動（localhost:5173）
npm run build  # 本番ビルド
```
