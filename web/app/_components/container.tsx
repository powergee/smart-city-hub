export default function Container(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-screen-2xl mx-4 lg:w-10/12 lg:mx-auto ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </div>
  );
}
