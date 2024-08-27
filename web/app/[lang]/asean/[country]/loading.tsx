export default function Loading() {
  return (
    <div role="status" className="w-full">
      {[360, 330, 300, 380, 420].map((width, idx) => (
        <div
          className="h-4 bg-gray-200 rounded-full m-4"
          key={idx}
          style={{ maxWidth: width }}
        ></div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
