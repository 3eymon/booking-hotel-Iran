
const Footer = () => {
  return (
    <footer className="py-4 text-center my-10">
      <div className="h-px  sm:w-1/3 bg-gradient-to-r from-black/5 via-black dark:via-white to-black/5 mx-auto mb-5" />
      <div className="flex gap-3 mx-auto justify-center items-center text-center">
        <p className="flex items-center gap-1 dark:text-white">
          طراحی شده توسط

          <a
            href="https://github.com/seyed-mohsen-mousavi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline transition-colors duration-300"
          >
            S.mohsen.M
          </a>         
           </p>
        <br />
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse font-bold">
          سلامی به Haj_flix
        </span>
      </div>
    </footer>
  );
};

export default Footer;
