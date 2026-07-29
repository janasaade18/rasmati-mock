/**
 * The header is fixed, so every route reserves the chrome's height
 * (announcement strip + nav) before its content begins.
 */
export function HeaderSpacer() {
  return <div aria-hidden className="h-[100px] lg:h-[112px]" />;
}
