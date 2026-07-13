"use client";
import "@/styles/ui.css";
import type { ReactNode } from "react";
import { Button, Checkbox, Input, Link, PasswordInput } from "@/components/ui";

interface ComponentPreviewProps {
  title: string;
  tag: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const ComponentPreview = ({ title, description, children, footer }: ComponentPreviewProps) => {
  return (
    <article className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <header className="flex items-start justify-between border-b bg-muted/40 px-5 py-4">
        <div className="w-full flex justify-center items-center gap-3 flex-col">
          <h3 className="text-base font-semibold">{title}</h3>

          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
      </header>

      {/* Preview */}
      <div className="flex min-h-52 items-center justify-center p-8" style={{ padding: "20px" }}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <footer className="border-t bg-muted/20 px-5 py-4 text-sm text-muted-foreground">
          {footer}
        </footer>
      )}
    </article>
  );
};

const DesignSystemPage = () => {
  return (
    <main className="mx-auto max-w-7xl space-y-10 p-8">
      {/* Page Header */}

      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Design System</h1>

        <p className="max-w-2xl text-muted-foreground">
          A collection of reusable UI components used throughout the application.
        </p>
      </div>

      {/* Grid */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" style={{ padding: "20px" }}>
        {/* Button */}

        <ComponentPreview
          title="Button"
          tag="<Button />"
          description="Interactive Component"
          footer={
            <>
              <strong>Variants:</strong> Default, Outline, Ghost, Link
            </>
          }
        >
          <Button>Click Me</Button>
        </ComponentPreview>

        {/* Input */}

        <ComponentPreview
          title="Input"
          tag="<Input />"
          description="Form Component"
          footer={
            <>
              <strong>Placeholder:</strong> Enter your email
            </>
          }
        >
          <Input placeholder="Enter your email" />
        </ComponentPreview>

        {/* input password */}
        <ComponentPreview
          title="Input Passw"
          tag="<Input Password />"
          description="Form Component"
          footer={
            <>
              <strong>Placeholder:</strong> Enter your password
            </>
          }
        >
          <PasswordInput placeholder="Enter your password" />
        </ComponentPreview>

        {/* Checkbox */}

        <ComponentPreview
          title="Checkbox"
          tag="<Checkbox />"
          description="Selection Control"
          footer={
            <>
              <strong>State:</strong> Unchecked
            </>
          }
        >
          <Checkbox label="Remember me" />
        </ComponentPreview>

        {/* Select */}

        <ComponentPreview
          title="Select"
          tag="<Select />"
          description="Dropdown Selection"
          footer={
            <>
              <strong>Items:</strong> 3
            </>
          }
        >
          <select className="w-72 rounded-md border bg-background px-3 py-2 text-sm">
            <option>React</option>
            <option>Next.js</option>
            <option>Vue</option>
          </select>
        </ComponentPreview>

        {/* Link */}

        <ComponentPreview
          title="Link"
          tag="<Link />"
          description="Navigation Element"
          footer={
            <>
              <strong>Style:</strong> Underline on hover
            </>
          }
        >
          <Link href="#">Visit Home Page...</Link>
        </ComponentPreview>

        {/* Badge */}

        <ComponentPreview
          title="Badge"
          tag="<Badge />"
          description="Status Indicator"
          footer={
            <>
              <strong>Variant:</strong> Secondary
            </>
          }
        >
          <span className="rounded-full border bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            New
          </span>
        </ComponentPreview>

        {/* Card */}

        <ComponentPreview title="Card" tag="<Card />" description="Surface Component">
          <div className="w-72 rounded-lg border bg-background p-5 shadow-sm">
            <h4 className="font-semibold">Project</h4>

            <p className="mt-2 text-sm text-muted-foreground">
              Build modern applications with reusable components.
            </p>
          </div>
        </ComponentPreview>

        {/* Avatar */}

        <ComponentPreview title="Avatar" tag="<Avatar />" description="Profile Component">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted text-lg font-semibold">
            VK
          </div>
        </ComponentPreview>
      </div>
    </main>
  );
};

export default DesignSystemPage;
