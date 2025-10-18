export function DashboardHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="border-b border-border bg-background px-8 py-6">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      {description && <p className="mt-2 text-muted-foreground">{description}</p>}
    </div>
  )
}
