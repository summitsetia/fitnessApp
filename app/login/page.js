import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white max-w-lg w-full p-10 rounded-2xl shadow-lg">
        <div className="flex justify-center pb-8">
          <Image src="/images/logo.png" alt="Logo" width={150} height={150} />
        </div>
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-900">
            Welcome to Summit Fitness
          </h1>
        </div>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              minLength="5"
              maxLength="50"
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              minLength="8"
              maxLength="64"
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-4">
            <Button
              formAction={login}
              className="w-full py-2 px-4 bg-blue-950 text-white rounded-md hover:bg-blue-800 transition"
            >
              Log in
            </Button>
            <Button
              formAction={signup}
              className="w-full py-2 px-4 border border-gray-300 text-white rounded-md text-sm  hover:bg-gray-100 transition"
            >
              Sign up
            </Button>
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
