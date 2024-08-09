interface Props {
  subtext: string;
  title: string;
  type?: "title" | "greeting";
  user?: string;
}

export const Header = ({ subtext, title, type = "title", user }: Props) => {
  return (
    <header className="home-header">
      <div className="header-box">
        <h1 className="header-box-title">
          {title}
          {type === "greeting" && (
            <span className="text-primary ml-2">{user}</span>
          )}
        </h1>
        <p className="header-box-subtext">{subtext}</p>
      </div>
    </header>
  );
};
