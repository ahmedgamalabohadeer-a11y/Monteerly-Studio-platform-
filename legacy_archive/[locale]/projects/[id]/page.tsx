type RouteParams = {
  id?: string;
  slug?: string;
  username?: string;
};

type DynamicPageProps = {
  params: Promise<RouteParams>;
};

export default async function DynamicPage({ params }: DynamicPageProps) {
  const resolvedParams = await params;
  const id =
    resolvedParams.id ??
    resolvedParams.slug ??
    resolvedParams.username ??
    "Unknown";

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
      <h1 className="mb-4 text-2xl font-bold">Page Content</h1>
      <div className="rounded-lg border border-border bg-muted/20 p-4">
        <p className="font-mono text-sm text-muted-foreground">
          Dynamic Param: <span className="font-bold text-primary">{id}</span>
        </p>
      </div>
    </div>
  );
}
