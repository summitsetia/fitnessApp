import IntroForm from "./IntroForm";

// page showing the form when a new user registers, this function is importing the IntroForm component
export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <IntroForm />
    </div>
  );
}
