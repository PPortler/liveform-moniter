
type Props = {
  tag: string;
  title: string;
  description: string;
};

function HeaderTitle({
  tag,
  title,
  description
}: Props) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
        {tag}
      </p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
        {description}
      </p>
    </div>
  )
}

export default HeaderTitle
