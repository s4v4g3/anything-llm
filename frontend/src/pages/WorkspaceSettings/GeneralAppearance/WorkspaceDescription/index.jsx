export default function WorkspaceDescription({ workspace, setHasChanges }) {
  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="description" className="block input-label">
          Workspace Description
        </label>
        <p className="text-white text-opacity-60 text-xs font-medium py-1.5">
          Give your workspace a brief description. This is optional and purely
          informational.
        </p>
      </div>
      <textarea
        name="description"
        rows={3}
        maxLength={500}
        defaultValue={workspace?.description || ""}
        className="border-none bg-theme-settings-input-bg text-white placeholder:text-theme-settings-input-placeholder text-sm rounded-lg focus:outline-primary-button active:outline-primary-button outline-none block w-full p-2.5 resize-y"
        placeholder="e.g. A workspace for onboarding documentation and FAQs"
        autoComplete="off"
        onChange={() => setHasChanges(true)}
      />
    </div>
  );
}
