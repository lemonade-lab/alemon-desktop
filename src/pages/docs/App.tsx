export default () => {
    return (
        <section className="h-full flex flex-col">
            <section className="h-6 drag-area  bg-gradient-to-tl from-sky-300 to-indigo-200" />
                <iframe
                    className="w-full h-full flex-1"
                    src="https://www.alemonjs.com"
                    title="Embedded Site"
                    sandbox="allow-same-origin allow-scripts allow-forms"
                />
        </section>
    )
}