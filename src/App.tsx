import { Button } from "./components";

export const App = () => {
  return (
    <main className="hello">
      <h1>Hello JSX!</h1>
      <Button
        title="Love button"
        onClick={() => {
          alert("Hi");
        }}
      />
    </main>
  );
};
