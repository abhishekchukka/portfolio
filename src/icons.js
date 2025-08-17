// Import all the icons from the new path with the .svg extension.
import CIcon from "./assets/icons/c-1.svg";
import CSSIcon from "./assets/icons/css-4.svg";
import DartIcon from "./assets/icons/dart.svg";
import ExpressIcon from "./assets/icons/express-109.svg";
import FirebaseIcon from "./assets/icons/firebase-3.svg";
import FlaskIcon from "./assets/icons/flask.svg";
import GithubIcon from "./assets/icons/github-icon-1.svg";
import JavaIcon from "./assets/icons/java-4.svg";
import MySQLIcon from "./assets/icons/mysql-logo-pure.svg";
import NextJsIcon from "./assets/icons/next-js.svg";
import NodeJsIcon from "./assets/icons/nodejs-1.svg";
import PostgresqlIcon from "./assets/icons/postgresql.svg";
import PostmanIcon from "./assets/icons/postman.svg";
import PythonIcon from "./assets/icons/python-3.svg";
import PytorchIcon from "./assets/icons/pytorch-2.svg";
import ReactIcon from "./assets/icons/react-2.svg";
import TailwindIcon from "./assets/icons/tailwind-css-2.svg";
import TypescriptIcon from "./assets/icons/typescript.svg";
import VSCodeIcon from "./assets/icons/visual-studio-code-1.svg";
import ViteIcon from "./assets/icons/vite.svg";
import ViteJsIcon from "./assets/icons/vitejs.svg";

// Create an array of objects for easy iteration. Each object has a name
// and the imported component.
const iconList = [
  { name: "CIcon", image: CIcon },
  { name: "CSSIcon", image: CSSIcon },
  { name: "DartIcon", image: DartIcon },
  { name: "ExpressIcon", image: ExpressIcon },
  { name: "FirebaseIcon", image: FirebaseIcon },
  { name: "FlaskIcon", image: FlaskIcon },
  { name: "GithubIcon", image: GithubIcon },
  { name: "JavaIcon", image: JavaIcon },
  { name: "MySQLIcon", image: MySQLIcon },
  { name: "NextJsIcon", image: NextJsIcon },
  { name: "NodeJsIcon", image: NodeJsIcon },
  { name: "PostgresqlIcon", image: PostgresqlIcon },
  { name: "PostmanIcon", image: PostmanIcon },
  { name: "PythonIcon", image: PythonIcon },
  { name: "PytorchIcon", image: PytorchIcon },
  { name: "ReactIcon", image: ReactIcon },
  { name: "TailwindIcon", image: TailwindIcon },
  { name: "TypescriptIcon", image: TypescriptIcon },
  { name: "VSCodeIcon", image: VSCodeIcon },
  { name: "ViteIcon", image: ViteIcon },
  { name: "ViteJsIcon", image: ViteJsIcon },
];

// Export the array as the default export of this module.
export default iconList;

// You can now import this array in any other file and map over it to render the icons.
// For example:
// import iconList from './index.js';
//
// const IconGrid = () => {
//   return (
//     <div>
//       {iconList.map((icon, index) => (
//         <div key={index}>
//           <p>{icon.name}</p>
//           <icon.component />
//         </div>
//       ))}
//     </div>
//   );
// };
