<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Routing

- `src/routes/brand.$brand.tsx` is a layout route that renders only `<Outlet />`; the brand models page lives in `brand.$brand.index.tsx` and the generator in `brand.$brand.$model.tsx`. Why: a parent route without an `<Outlet />` swallows its child routes — the model page URL changed but never rendered.

