import "../styles/loading.css";
export const LoadingComponent = () => {
  return (
    <>
      <div className="flex flex-col gap-8 h-[100%] w-[100%] items-center justify-center">
        <span className="loader"></span>
        <p className="text-[28px] text-[#0F3971] font-normal shadow-[#FF9853]">Estamos trabajando para ti</p>
      </div>
    </>
  );
};
