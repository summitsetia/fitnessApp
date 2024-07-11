import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-blue-100 max-w-md w-full p-8 rounded-lg shadow-md flex justify-center ">
        <form className="mt-8 space-y-6">
          <div className="flex justify-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Account Access
            </h1>
          </div>
          <div>
            <label htmlFor="email" className="mr-4">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="mr-4">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          <div className="space-y-4">
            <button
              formAction={login}
              className=" w-full py-2 px-4 border rounded-md text-sm bg-blue-950 text-white "
            >
              Log in
            </button>
            <button
              formAction={signup}
              className=" w-full py-2 px-4 border rounded-md text-sm "
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// import { login, signup } from "./actions";

// export default function LoginPage() {
//   return (
//     <form>
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       <button formAction={login}>Log in</button>
//       <button formAction={signup}>Sign up</button>
//     </form>
//   );
// }
