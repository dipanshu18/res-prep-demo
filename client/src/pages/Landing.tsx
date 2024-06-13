import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className="flex gap-10">
            <Link to="/a/login">
              <button className="btn btn-primary">Admin Login</button>
            </Link>
            <Link to="/t/login">
              <button className="btn btn-secondary">Teacher login</button>
            </Link>
            <Link to="/s/login">
              <button className="btn btn-accent">Student login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
