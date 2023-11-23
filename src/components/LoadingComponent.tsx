import "../styles/loading.css";
export const LoadingComponent = () => {
  return (
    <>
      <div className="flex h-[100%] w-[100%] flex-col items-center justify-center gap-8">
        <span className="loader"></span>
        <p className="text-[28px] font-normal text-[#0F3971] shadow-[#FF9853]">
          Estamos trabajando para ti
        </p>
      </div>
    </>
  );
};
