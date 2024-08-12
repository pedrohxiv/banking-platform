interface Props {
  subtext: string;
  title: string;
  type?: "title" | "greeting";
  user?: string;
}

export const Header = ({ subtext, title, type = "title", user }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl leading-[30px] lg:text-3xl lg:leading-[38px] font-semibold text-gray-900">
        {title}
        {type === "greeting" && (
          <span className="text-primary ml-2">{user}</span>
        )}
      </h1>
      <p className="text-sm lg:text-base font-normal text-gray-600">
        {subtext}
      </p>
    </div>
  );
};
