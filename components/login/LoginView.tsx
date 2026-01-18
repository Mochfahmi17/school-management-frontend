import Image from "next/image";
import LoginForm from "./LoginForm";
import Link from "next/link";

const LoginView = () => {
  return (
    <div className="grid md:grid-cols-2">
      <div className="relative h-screen hidden md:block">
        <Image src="/login-image.jpg" alt="Login Image" fill className="object-center object-cover" />
      </div>
      <div className="h-screen flex relative items-center px-[3%] justify-center">
        <LoginForm />
        <div className="text-center absolute inset-x-0 bottom-0 py-4">
          <p className="text-sm text-gray-800">You don&apos;t have account?</p>
          <Link href="#" className="text-blue-600 text-sm hover:underline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
