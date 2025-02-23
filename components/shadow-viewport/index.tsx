export function ShadowViewPort() {
  return (
    <>
      <span className="fixed block w-[140%] z-10 top-0 left-[-20%] shadow-view-top"></span>
      <span className="fixed block w-[140%] z-10 bottom-0 left-[-20%] shadow-view-bottom"></span>
    </>
  );
}
