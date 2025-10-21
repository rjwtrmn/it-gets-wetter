export function MaterialSymbolsIcon({ className, icon }: {
    className: string;
    icon: string;
}) {
    return <span className={ 'material-symbols-outlined ' + className }>{ icon }</span>;
}