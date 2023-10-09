

const InstractorCode = () => {
    return (
        <div className="max-w-[500px] mx-auto mt-10 bg-zinc-100 p-10 rounded-md">
        <h1 className="mb-10 text-4xl font-bold">Login</h1>
        <form className="flex flex-col gap-2 text-center">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded-md bg-zinc-200"
          />

          <div className="relative">
            <input
              type="email"
              placeholder="Password"
              className="w-full px-3 py-2 rounded-md bg-zinc-200"
            />

            <span className="absolute -translate-y-1/2 right-5 top-1/2">
              <AiFillEye />
            </span>
          </div>
        </form>
      </div>
    );
};

export default InstractorCode;