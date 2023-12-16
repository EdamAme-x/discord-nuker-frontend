# discord-nuker-frontend
Discord荒らしツールのフロントエンドです。 Sponsor: 荒らし共栄圏

### Rules

#### PullRequest
PR前には `pnpm lint`, `pnpm format` を実行してください。
どうしても改善出来ないエラーが有れば、PRの文章の最初に
`!!! DONT MERGE THIS !!!` を付けてエラーの内容を貼ってください。確認します。

#### Branch
`feat/{feat_name}`
`hotfix/{fix_name}`
`tmp/{tmp_name}`

#### Component
パスカルケースが基本です。
*e.g.*
```tsx
export function CallbackButton(props) {
    return <button>PUSH</button>
}
```

### Variables
キャメルケースが基本ですが、関数、クラス等はパスカルケース推奨です。
*e.g.*
```tsx
const isExist = false
function CheckExist() {
    ...
}

class ExistManager {
    ...
}
```

#### FileName
キャメルケースが基本です。
`layout.tsx`, `callbackButton.tsx`, etc...

### Setup

```shell
pnpm i
pnpm dev
```

### Shadcn add UI
```shell
pnpm add-ui {UINAME}
```

### Formt & Lint
```shell
pnpm lint
pnpm format
```

### Start Server
```shell
pnpm dev
```

## Stacks
- [Next.js](https://next.js.org)
  - AppRouter
  - RSC
- [ShadcnUI](https://ui.shadcn.com/)
  - [TailwindCSS](https://tailwind.com)
  - [useHooks](https://usehooks.co)