import { Button } from "./components";
import { Layout } from "./layout";
import "./styles.scss";

export const App = () => {
  return (
    <Layout>
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
    </Layout>
  );
};
