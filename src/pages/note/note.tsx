import "./note.css";

import { useState, useEffect, useContext } from "react";
import { WindowContext } from "../../context/windowContext";

import { TisseoTracker, ETodo, Portfolio } from "../../components/noteLoader/noteLoader";
import fetchRepos from "../../utils/fetchRepos";
import formatNoteDate from "../../utils/formatNoteDate";
import formatShortDate from "../../utils/formatShortDate";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  topics: string[] | null;
  pushed_at: string;
};

const imageLoader = {
  "eTodo": ETodo,
  "Portfolio": Portfolio,
  "TisseoTracker": TisseoTracker, 
}

const autorisedRepos = ["eTodo", "Portfolio", "TisseoTracker"];

function NoteSideBar() {
  const { windows, setWindowPage } = useContext(WindowContext)!;
  const [repos, setRepos] = useState<Repo[]>([]);

  const openRepo = windows.find(w => w.title === "Note")?.currentPage || repos[0]?.name || null;

  useEffect(() => {
    fetchRepos().then((data) => {
      if (Array.isArray(data)) setRepos(data);
    });
  }, []);

  return (
    <>
      {repos.filter((repo) => autorisedRepos.includes(repo.name)).map((repo) => (
        <div key={repo.name} className={`sideBarRepo ${openRepo === repo.name ? "active" : ""}`} onClick={() => setWindowPage("Note", repo.name)}>
          <div className="sideBarRepoName">{repo.name}</div>
          <div className="sideBarRepoInfo">
            <div className="sideBarRepoDate">{formatShortDate(new Date(repo.pushed_at))}</div>
            <div className="sideBarRepoDescription">{repo.description}</div>
          </div>
        </div>
      ))}
    </>
  );
}

function Note() {
  const { windows } = useContext(WindowContext)!;
  const [repos, setRepos] = useState<Repo[]>([]);
  const openRepo = windows.find(w => w.title === "Note")?.currentPage || repos[0]?.name || null;

  useEffect(() => {
    fetchRepos().then((data) => {
      if (Array.isArray(data)) setRepos(data);
    });
  }, []);

  return (
    <>
      {repos
        .filter((repo) => repo.name === openRepo)
        .map((repo) => {
          const NoteImage = imageLoader[repo.name as keyof typeof imageLoader];
          return (
            <div key={repo.id} className="noteContainer">
              <div className="noteDate">{formatNoteDate(new Date(repo.pushed_at))}</div>
              <div className="noteTitle">{repo.name}</div>
              <div className="noteImageContainer">
                <NoteImage />
              </div>
              <div className="noteDescription">{repo.description}</div>
              {repo.topics && repo.topics.length > 0 && (
                <div className="topicsContainer">
                  {repo.topics.map((topic) => (
                    <div key={topic} className="topicChild">
                      <i className={`devicon-${topic.toLowerCase()}-plain topicIcon`}></i>
                      <div className="topicText">{topic}</div>
                    </div>
                  ))}
                </div>
              )}
              {repo.homepage && (
                <a className="noteLink" href={repo.homepage} target="_blank">Ouvir le site </a>
              )}
              <a className="noteLink" href={repo.html_url} target="_blank">Ouvir le dépot</a>
            </div>
            
          );
        })}
    </>
  );
}

export { Note, NoteSideBar };
