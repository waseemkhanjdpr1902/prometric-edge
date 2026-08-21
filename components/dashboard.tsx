"use client";
import { useEffect,useState } from "react";
import { ArrowRight,BarChart3,BookOpenCheck,LogOut,Target,Trophy } from "lucide-react";
import { getFirebaseSession,hasFirebaseConfig,signOut } from "@/lib/firebase-auth";
type Stats={attempts:number;best:number;answered:number};
const empty:Stats={attempts:0,best:0,answered:0};

export function Dashboard(){
 const [pharmacist,setPharmacist]=useState<Stats>(empty),[nurse,setNurse]=useState<Stats>(empty),[email,setEmail]=useState("Learner"),[ready,setReady]=useState(false);
 useEffect(()=>{for(const [key,setter] of [["prometric-edge-pharmacist",setPharmacist],["prometric-edge-nurse",setNurse]] as const){const raw=localStorage.getItem(key);if(raw)try{setter(JSON.parse(raw))}catch{}}const session=getFirebaseSession();if(hasFirebaseConfig&&!session){location.href="/login";return}if(session&&!session.emailVerified){location.href="/login";return}if(session?.email)setEmail(session.email);setReady(true)},[]);
 function logout(){signOut();location.href="/login"}
 if(!ready)return <main className="dashboard-loading">Loading your dashboard…</main>;
 const total=pharmacist.answered+nurse.answered,best=Math.max(pharmacist.best,nurse.best),tracks=([["pharmacist","Gulf Pharmacist",pharmacist],["nurse","Registered Nurse",nurse]] as const);
 return <main className="dashboard-page"><header className="dash-head"><a href="/" className="brand"><span><Target/></span>Prometric <b>Edge</b></a><div><span>{email}</span><button onClick={logout}><LogOut/>Sign out</button></div></header><section className="dash-welcome"><span className="eyebrow">Learning dashboard</span><h1>Welcome back.</h1><p>Continue a track or focus on the topic that needs the most attention.</p></section><section className="dash-stats"><article><BookOpenCheck/><span>Questions completed<b>{total}</b></span></article><article><Trophy/><span>Best score<b>{best}%</b></span></article><article><BarChart3/><span>Total attempts<b>{pharmacist.attempts+nurse.attempts}</b></span></article></section><section className="dash-tracks"><h2>Your exam tracks</h2>{tracks.map(([slug,title,stats])=><article key={slug}><div><span className="eyebrow">DHA · DOH · MOHAP</span><h3>{title}</h3><p>{stats.answered?`${stats.answered} questions completed · Best ${stats.best}%`:"Ready for your first diagnostic session"}</p></div><a className="primary-button" href={`/exams/${slug}/practice`}>{stats.answered?"Continue":"Start learning"}<ArrowRight/></a></article>)}</section><section className="dash-help"><div><span className="eyebrow">Recommended next step</span><h2>{best>=70?"Take a timed mock session.":"Build accuracy in Practice mode."}</h2><p>{best>=70?"Test decision speed without revealing answers until submission.":"Use explanations immediately and review your lowest-scoring topic."}</p></div><a className="ghost-button" href="/exams">Choose session</a></section></main>
}
