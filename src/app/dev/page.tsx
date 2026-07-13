import { Link } from "@/components/ui";

const devPages = [
  { label: "Typography", href: "/dev/typography" },
  { label: "Design System", href: "/dev/design-system" },
];

const DevPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {devPages.map((page) => (
        <div className="card" key={devPages.indexOf(page)}>
          <Link href={page.href}>{page.label}</Link>
        </div>
      ))}
    </div>
  );
};

export default DevPage;
