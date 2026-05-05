import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CaretRight, SlidersHorizontal } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import Workspace from "@/models/workspace";
import System from "@/models/system";
import paths from "@/utils/paths";
import useUser from "@/hooks/useUser";
import { useModal } from "@/hooks/useModal";
import LLMSelectorModal from "../PromptInput/LLMSelector/index";
import SetupProvider from "../PromptInput/LLMSelector/SetupProvider";
import {
  SAVE_LLM_SELECTOR_EVENT,
  PROVIDER_SETUP_EVENT,
} from "../PromptInput/LLMSelector/action";

function fetchModelName(slug, setModelName) {
  if (!slug) return;
  Promise.all([Workspace.bySlug(slug), System.keys()]).then(
    ([workspace, systemSettings]) => {
      const model = workspace.chatModel ?? systemSettings?.LLMModel ?? "";
      setModelName(model);
    }
  );
}

/**
 * Unified header bar for the chat container.
 * Shows breadcrumbs (or workspace name) on the left, model picker on the right.
 */
export default function ChatHeader({ workspace }) {
  if (isMobile) return null;

  return (
    <div className="flex items-center justify-between px-4 py-1.5 border-b border-white/5 light:border-slate-200 bg-zinc-900/50 light:bg-slate-50 text-xs z-10 relative">
      <Breadcrumbs workspace={workspace} />
      <ModelPicker workspaceSlug={workspace?.slug} />
    </div>
  );
}

function Breadcrumbs({ workspace }) {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    if (!workspace?.slug) return;
    async function fetchBreadcrumbs() {
      const crumbs = await Workspace.getBreadcrumbs(workspace.slug);
      setBreadcrumbs(crumbs);
    }
    fetchBreadcrumbs();
  }, [workspace?.slug]);

  // For root workspaces (no ancestors), just show the workspace name
  if (breadcrumbs.length <= 1) {
    return (
      <span className="text-zinc-300 light:text-slate-600 font-medium">
        {workspace?.name || ""}
      </span>
    );
  }

  return (
    <nav
      aria-label="Workspace breadcrumbs"
      className="flex items-center gap-x-1 text-zinc-400 light:text-slate-500"
    >
      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        return (
          <span key={crumb.slug} className="flex items-center gap-x-1">
            {idx > 0 && (
              <CaretRight
                size={10}
                className="text-zinc-500 light:text-slate-400"
              />
            )}
            {isLast ? (
              <span className="text-zinc-200 light:text-slate-700 font-medium">
                {crumb.name}
              </span>
            ) : (
              <Link
                to={paths.workspace.chat(crumb.slug)}
                className="hover:text-white light:hover:text-slate-900 transition-colors"
              >
                {crumb.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

function ModelPicker({ workspaceSlug = null }) {
  const { t } = useTranslation();
  const { slug: urlSlug } = useParams();
  const slug = urlSlug ?? workspaceSlug;
  const { user } = useUser();
  const [showSelector, setShowSelector] = useState(false);
  const [modelName, setModelName] = useState("");
  const {
    isOpen: isSetupProviderOpen,
    openModal: openSetupProviderModal,
    closeModal: closeSetupProviderModal,
  } = useModal();
  const [config, setConfig] = useState({ settings: {}, provider: null });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => fetchModelName(slug, setModelName), [slug]);

  useEffect(() => {
    function handleSave() {
      setShowSelector(false);
      fetchModelName(slug, setModelName);
    }
    window.addEventListener(SAVE_LLM_SELECTOR_EVENT, handleSave);
    return () =>
      window.removeEventListener(SAVE_LLM_SELECTOR_EVENT, handleSave);
  }, [slug]);

  useEffect(() => {
    function handleProviderSetup(e) {
      const { provider, settings } = e.detail;
      setConfig({ settings, provider });
      setTimeout(() => openSetupProviderModal(), 300);
    }
    window.addEventListener(PROVIDER_SETUP_EVENT, handleProviderSetup);
    return () =>
      window.removeEventListener(PROVIDER_SETUP_EVENT, handleProviderSetup);
  }, []);

  // Hide for non-admin users in multi-user mode
  if (!!user && user.role !== "admin") return null;
  if (!slug) return null;

  return (
    <>
      {showSelector && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setShowSelector(false)}
        />
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowSelector(!showSelector)}
          className={`group border-none cursor-pointer px-2 py-0.5 flex items-center gap-x-1.5 rounded-full transition-all ${
            showSelector
              ? "bg-zinc-700 light:bg-slate-200"
              : "hover:bg-zinc-700 light:hover:bg-slate-200"
          }`}
        >
          <span
            className={`text-xs ${
              showSelector
                ? "text-white light:text-slate-800"
                : "text-zinc-500 light:text-slate-500 group-hover:text-white light:group-hover:text-slate-800"
            }`}
          >
            {modelName || t("chat_window.select_model")}
          </span>
          <SlidersHorizontal
            size={12}
            className={`${
              showSelector
                ? "text-white light:text-slate-800"
                : "text-zinc-500 light:text-slate-500 group-hover:text-white light:group-hover:text-slate-800"
            }`}
          />
        </button>

        {showSelector && (
          <div className="absolute right-0 top-full mt-1 bg-zinc-800 light:bg-white border border-zinc-700 light:border-slate-300 rounded-xl shadow-lg w-[620px] overflow-hidden z-30">
            <LLMSelectorModal
              key={refreshKey}
              workspaceSlug={slug}
              initialProvider={config.provider?.value}
            />
          </div>
        )}
      </div>

      <SetupProvider
        isOpen={isSetupProviderOpen}
        closeModal={closeSetupProviderModal}
        postSubmit={() => {
          closeSetupProviderModal();
          setRefreshKey((k) => k + 1);
        }}
        settings={config.settings}
        llmProvider={config.provider}
      />
    </>
  );
}
