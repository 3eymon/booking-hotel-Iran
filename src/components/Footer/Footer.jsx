
const Footer = () => {
  return (
    <footer className="py-4 text-center my-10">
      <div className="h-px  sm:w-1/3 bg-gradient-to-r from-black/5 via-black dark:via-white to-black/5 mx-auto mb-5" />
      <div className="flex gap-3 mx-auto justify-center items-center text-center">
        <p className="flex items-center gap-1">
          {/* <LiaConnectdevelop className="size-5" /> */}
          طراحی شده توسط{" "}
          <a
            href="https://github.com/seyed-mohsen-mousavi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            S.mohsen.M
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
