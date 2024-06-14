import { Button } from "./components";

export const App = () => {
  return (
    <main className="hello">
      <h1>Hello JSX!</h1>
      <Button
        onClick={() => {
          alert("Hi");
        }}
      >
        Love button
      </Button>
    </main>
  );
};
