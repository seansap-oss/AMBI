import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu, Home, Users, CalendarDays, FileText, Plus, Search, CheckCircle2, XCircle, Clock3, ShieldCheck, Mail, Phone, Building2, UserRound, BadgeCheck, Bell, Download, Share2, ChevronRight, LogIn, UserPlus, BriefcaseBusiness, Sparkles, UploadCloud, Image as ImageIcon, Paperclip, Trash2 } from 'lucide-react';
import './styles.css';

const sectors = [
  { id: 'all', icon: '✨', label: 'All', count: 28 },
  { id: 'healthcare', icon: '🏥', label: 'Healthcare', count: 5 },
  { id: 'automotive', icon: '🚗', label: 'Automotive', count: 6 },
  { id: 'hospitality', icon: '🏨', label: 'Hospitality', count: 4 },
  { id: 'construction', icon: '🏗️', label: 'Construction', count: 5 },
  { id: 'technology', icon: '💻', label: 'Technology', count: 3 },
  { id: 'education', icon: '🎓', label: 'Education', count: 3 },
  { id: 'media', icon: '📰', label: 'Media', count: 2 },
];

const members = [
  { id: 'aadarsh', name: 'Aadarsh Sharma', title: 'Managing Partner', company: 'Aadarsh Lab & Medicare Services', sector: 'healthcare', phone: '7005242123', email: 'aadarshsharma1237@gmail.com', initials: 'AM', verified: true, verifiedBy: 'Admin L. Ibomcha', services: ['Diagnostic Centre', 'Medicare Services', 'Health Support'], about: 'Healthcare and diagnostic services focused on reliable access and professional care.' },
  { id: 'island', name: 'Rakesh Laishram', title: 'Director', company: 'Island Nissan', sector: 'automotive', phone: '9862011111', email: 'info@islandnissan.in', initials: 'IN', verified: true, verifiedBy: 'Admin N. Kumar', services: ['Automobile Sales', 'Vehicle Service', 'Customer Support'], about: 'Automotive dealership and service support for modern mobility needs.' },
  { id: 'sangaihotel', name: 'K. Ranjit', title: 'Proprietor', company: 'Sangai Hotel', sector: 'hospitality', phone: '9436032100', email: 'booking@sangaihotel.com', initials: 'SH', verified: true, verifiedBy: 'Admin A. Singh', services: ['Hotel Rooms', 'Events', 'Hospitality'], about: 'Hospitality services for guests, travellers, and business visitors.' },
  { id: 'impacttv', name: 'Y. Romen', title: 'Founder', company: 'Impact TV', sector: 'media', phone: '7000000000', email: 'contact@impacttv.in', initials: 'IT', verified: true, verifiedBy: 'Admin L. Ibomcha', services: ['Media Coverage', 'Broadcast', 'Production'], about: 'Media and broadcast platform covering public information and regional stories.' },
  { id: 'sangaitech', name: 'Ningthoujam Dev', title: 'Founder', company: 'Sangai Technologies', sector: 'technology', phone: '8787000000', email: 'hello@sangaitech.in', initials: 'ST', verified: true, verifiedBy: 'Admin K. Devi', services: ['IT Services', 'Software', 'Digital Support'], about: 'Technology support and digital services for local businesses.' },
  { id: 'comet', name: 'T. Robindro', title: 'Chairman', company: 'COMET School', sector: 'education', phone: '7085000000', email: 'office@cometschool.in', initials: 'CS', verified: true, verifiedBy: 'Admin N. Kumar', services: ['Education', 'Academic Programs', 'Student Development'], about: 'Educational institution focused on student growth and academic excellence.' },
  { id: 'hvs', name: 'H. Vikram', title: 'Managing Director', company: 'HVS Construction', sector: 'construction', phone: '9366000000', email: 'projects@hvs.co.in', initials: 'HC', verified: true, verifiedBy: 'Admin A. Singh', services: ['Construction', 'Project Delivery', 'Civil Works'], about: 'Construction and project delivery services for commercial and private works.' },
];

const pendingMembersInitial = [
  { id: 'pm-1', name: 'Th. Sanatomba', email: 'sanatomba@example.com', phone: 'Optional not provided', company: 'Sanatomba Trading', sector: 'retail', submitted: 'Today, 10:20 AM', match: 'Possible directory match: Sanatomba Trading', status: 'Pending' },
  { id: 'pm-2', name: 'R.K. Binodini', email: 'binodini@example.com', phone: '9862123000', company: 'Leibaklei Hospitality', sector: 'hospitality', submitted: 'Today, 9:05 AM', match: 'Matched: Leibaklei Hotel', status: 'Pending' },
  { id: 'pm-3', name: 'N. Premkumar', email: 'prem@example.com', phone: 'Optional not provided', company: 'Eastern Motors', sector: 'automotive', submitted: 'Yesterday, 5:44 PM', match: 'Matched: Eastern Motors', status: 'Pending' },
];

const eventsInitial = [
  { id: 'ev-1', day: 7, title: 'BEG Business Meet', time: '10:30 AM', location: 'Imphal Hotel', createdBy: 'Aadarsh Sharma', approvedBy: 'Admin L. Ibomcha', attending: ['Aadarsh Sharma', 'Rakesh Laishram'], maybe: ['K. Ranjit'], not: ['Y. Romen'] },
  { id: 'ev-2', day: 15, title: 'SYNERGY Planning', time: '3:00 PM', location: 'BEG Office', createdBy: 'Sangai Technologies', approvedBy: 'Admin K. Devi', attending: ['Ningthoujam Dev'], maybe: ['T. Robindro'], not: [] },
  { id: 'ev-3', day: 22, title: 'Member Networking Evening', time: '5:30 PM', location: 'City Convention Hall', createdBy: 'Island Nissan', approvedBy: 'Admin N. Kumar', attending: ['Rakesh Laishram', 'H. Vikram'], maybe: [], not: ['Aadarsh Sharma'] },
];

const contentInitial = [
  { id: 'ct-1', type: 'Announcement', title: 'SYNERGY Business Summit Planning Open', summary: 'Members are invited to submit ideas, sponsorship interest and delegate recommendations for the upcoming SYNERGY business summit.', body: 'The organizing committee is collecting member suggestions for speakers, partner businesses and cross-border trade discussion topics.', submittedBy: 'Aadarsh Sharma', company: 'Aadarsh Lab & Medicare Services', submittedAt: 'Today, 11:10 AM', status: 'Approved', approvedBy: 'Admin L. Ibomcha', approvedAt: 'Today, 11:35 AM', visibility: 'Public' },
  { id: 'ct-2', type: 'Business Offer', title: 'Member Offer: Fleet Service Support', summary: 'Island Nissan is offering priority service booking for verified BEG members during June.', body: 'Verified members can contact the Island Nissan team to access priority service slots and consultation for fleet maintenance needs.', submittedBy: 'Rakesh Laishram', company: 'Island Nissan', submittedAt: 'Today, 9:00 AM', status: 'Pending', approvedBy: '', approvedAt: '', visibility: 'Private until approved' },
  { id: 'ct-3', type: 'Event Notice', title: 'Healthcare Sector Networking Roundtable', summary: 'A focused networking session for healthcare, diagnostic and wellness-sector members.', body: 'The roundtable will allow healthcare members to exchange services, partnership ideas and community health initiative proposals.', submittedBy: 'Aadarsh Sharma', company: 'Aadarsh Lab & Medicare Services', submittedAt: 'Yesterday, 4:20 PM', status: 'Pending', approvedBy: '', approvedAt: '', visibility: 'Private until approved' },
];


const admins = ['Admin L. Ibomcha', 'Admin N. Kumar', 'Admin K. Devi', 'Admin A. Singh'];
const tabs = ['Home', 'About', 'Directory', 'Reminder', 'Submit', 'Management', 'e-PDF'];

function App() {
  const [page, setPage] = useState('Home');
  const [drawer, setDrawer] = useState(false);
  const [sector, setSector] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(members[0]);
  const [pendingMembers, setPendingMembers] = useState(pendingMembersInitial);
  const [events, setEvents] = useState(eventsInitial);
  const [selectedEvent, setSelectedEvent] = useState(eventsInitial[0]);
  const [contents, setContents] = useState(contentInitial);
  const [currentUser, setCurrentUser] = useState(null);
  const [toast, setToast] = useState('');

  const filteredMembers = useMemo(() => members.filter(m => (sector === 'all' || m.sector === sector) && `${m.name} ${m.company} ${m.services.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [sector, query]);

  const navigate = (target) => { setPage(target); setDrawer(false); window.scrollTo({top:0, behavior:'smooth'}); };
  const notify = (msg) => { setToast(msg); try { new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=').play().catch(()=>{}); } catch {} setTimeout(()=>setToast(''), 2500); };

  const approveMember = (id, admin, linkedProfileId) => {
    const linked = members.find(m => m.id === linkedProfileId);
    setPendingMembers(items => items.map(item => item.id === id ? {
      ...item,
      status: 'Approved',
      linkedProfileId: linked?.id || item.linkedProfileId,
      linkedProfileName: linked ? `${linked.name} • ${linked.company}` : item.linkedProfileName || 'No profile linked',
      verifiedBy: admin,
      verifiedOn: new Date().toLocaleString()
    } : item));
    notify(`Member approved by ${admin}${linked ? ` and linked to ${linked.company}` : ''}`);
  };
  const rejectMember = (id, admin) => {
    setPendingMembers(items => items.map(item => item.id === id ? {...item, status: 'Rejected', verifiedBy: admin, verifiedOn: new Date().toLocaleString()} : item));
    notify(`Member rejected by ${admin}`);
  };

  const submitMemberSignup = (form) => {
    const text = `${form.name} ${form.email} ${form.company}`.toLowerCase();
    const candidates = members
      .map(m => {
        let score = 0;
        if (form.email && m.email.toLowerCase() === form.email.toLowerCase()) score += 90;
        if (form.name && m.name.toLowerCase().includes(form.name.toLowerCase())) score += 45;
        if (form.company && m.company.toLowerCase().includes(form.company.toLowerCase())) score += 45;
        if (`${m.name} ${m.company} ${m.email}`.toLowerCase().split(' ').some(part => part.length > 4 && text.includes(part))) score += 10;
        return {...m, score};
      })
      .filter(m => m.score > 0)
      .sort((a,b)=>b.score-a.score)
      .slice(0,3);
    const best = candidates[0];
    const request = {
      id: `pm-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone || 'Optional not provided',
      company: form.company || 'Not provided',
      sector: best?.sector || 'pending',
      submitted: new Date().toLocaleString(),
      match: best ? `Suggested match: ${best.name} • ${best.company}` : 'No automatic match — admin must link manually',
      candidateIds: candidates.map(c=>c.id),
      linkedProfileId: best?.id || '',
      linkedProfileName: best ? `${best.name} • ${best.company}` : '',
      status: 'Pending'
    };
    setPendingMembers(items => [request, ...items]);
    setCurrentUser({name: form.name, email: form.email, pending: true});
    notify('Signup submitted. Admin must verify and link the directory profile.');
    navigate('Management');
  };
  const submitContent = (form) => {
    const member = currentUser?.linkedProfile || members[0];
    const item = {
      id: `ct-${Date.now()}`,
      type: form.type,
      title: form.title,
      summary: form.summary,
      body: form.body,
      asset: form.asset || null,
      submittedBy: currentUser?.name || member.name,
      company: member.company || form.company || 'Verified AMBI Member',
      submittedAt: new Date().toLocaleString(),
      status: 'Pending',
      approvedBy: '',
      approvedAt: '',
      visibility: 'Private until approved'
    };
    setContents(list => [item, ...list]);
    notify('Content submitted for admin approval. It is not public yet.');
    navigate('Management');
  };
  const approveContent = (id, admin) => {
    setContents(list => list.map(item => item.id === id ? {...item, status: 'Approved', approvedBy: admin, approvedAt: new Date().toLocaleString(), visibility: 'Public'} : item));
    notify(`Content approved by ${admin}`);
  };
  const rejectContent = (id, admin) => {
    setContents(list => list.map(item => item.id === id ? {...item, status: 'Rejected', approvedBy: admin, approvedAt: new Date().toLocaleString(), visibility: 'Rejected / Not public'} : item));
    notify(`Content rejected by ${admin}`);
  };

  const rsvp = (status) => {
    const name = currentUser?.name || 'Verified Member Demo';
    const clean = ev => ({...ev, attending: ev.attending.filter(x=>x!==name), maybe: ev.maybe.filter(x=>x!==name), not: ev.not.filter(x=>x!==name)});
    const changed = clean(selectedEvent);
    if (status === 'attending') changed.attending = [...changed.attending, name];
    if (status === 'maybe') changed.maybe = [...changed.maybe, name];
    if (status === 'not') changed.not = [...changed.not, name];
    setSelectedEvent(changed);
    setEvents(list => list.map(ev => ev.id === changed.id ? changed : ev));
    notify(`${name} marked ${status.replace('not','not attending')}`);
  };

  return <div className="app">
    {toast && <div className="toast"><Bell size={18}/>{toast}</div>}
    <header className="topbar">
      <button className="iconBtn" onClick={()=>setDrawer(true)} aria-label="Open menu"><Menu/></button>
      <div className="brand"><img className="brandLogo" src="/ambi-logo.png" alt="AMBI logo"/><div><strong>AMBI</strong><small>Business Excellence Group</small></div></div>
      <nav className="desktopNav">{['Home','About','Directory','Contact'].map(t => <button className={page===t?'active':''} onClick={()=>navigate(t)} key={t}>{t}</button>)}</nav>
      <button className="loginPill" onClick={()=>navigate('Signup')}><LogIn size={17}/> Member Login</button>
    </header>
    {drawer && <div className="overlay" onClick={()=>setDrawer(false)}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawerHead"><img className="drawerLogo" src="/ambi-logo.png" alt="AMBI logo"/><b>AMBI Menu</b></div>{tabs.concat('Signup').map(t=><button onClick={()=>navigate(t)} className={page===t?'active drawerItem':'drawerItem'} key={t}>{t}</button>)}</aside></div>}
    <main>
      {page === 'Home' && <HomePage navigate={navigate} pendingMembers={pendingMembers} contents={contents} events={events} members={members}/>} 
      {page === 'About' && <AboutPage/>}
      {page === 'Directory' && <DirectoryPage sector={sector} setSector={setSector} query={query} setQuery={setQuery} filteredMembers={filteredMembers} setSelectedMember={(m)=>{setSelectedMember(m); navigate('Profile')}}/>}
      {page === 'Profile' && <ProfilePage member={selectedMember}/>} 
      {page === 'Reminder' && <ReminderPage events={events} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} rsvp={rsvp} members={members} setSelectedMember={(m)=>{setSelectedMember(m); navigate('Profile')}}/>} 
      {page === 'Submit' && <SubmitPage currentUser={currentUser} submitContent={submitContent}/>} 
      {page === 'Management' && <ManagementPage pendingMembers={pendingMembers} members={members} contents={contents} approveMember={approveMember} rejectMember={rejectMember} approveContent={approveContent} rejectContent={rejectContent} setSelectedMember={(m)=>{setSelectedMember(m); navigate('Profile')}}/>} 
      {page === 'e-PDF' && <PdfPage contents={contents}/>} 
      {page === 'Signup' && <SignupPage submitMemberSignup={submitMemberSignup} members={members}/>} 
      {page === 'Contact' && <ContactPage/>}
    </main>
    <footer className="bottomNav"><button onClick={()=>navigate('Reminder')}><CalendarDays/>Reminder</button><button className="plus" onClick={()=>navigate('Submit')}><Plus/></button><button onClick={()=>navigate('e-PDF')}><FileText/>e-PDF</button></footer>
  </div>
}

function Hero({children, eyebrow, title, desc}) { return <section className="hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="heroDesc">{desc}</p>{children}</section> }
function HomePage({navigate, pendingMembers, contents, events, members}) { 
  const approved = contents.filter(c=>c.status==='Approved').slice(0,3);
  const pending = contents.filter(c=>c.status==='Pending').slice(0,3);
  const featured = members.slice(0,4);
  const upcoming = events.slice(0,3);
  const topSectors = sectors.slice(1,7);
  return <>
    <section className="homeHeroV10">
      <div className="homeHeroCopy">
        <p className="eyebrow">Business Excellence Group · AMBI</p>
        <h1>One trusted app for members, events, announcements and business connections.</h1>
        <p>AMBI brings verified member profiles, RSVP events, approved posts, digital visiting cards and e-PDF articles into one clean, mobile-ready platform.</p>
        <div className="heroActions">
          <button className="primary" onClick={()=>navigate('Directory')}><Search/>Explore Directory</button>
          <button className="secondary" onClick={()=>navigate('Reminder')}><CalendarDays/>View Events</button>
          <button className="secondary" onClick={()=>navigate('Submit')}><Plus/>Submit Update</button>
        </div>
      </div>
      <div className="heroPhoneMock">
        <div className="phoneTop"><span></span><img className="phoneLogo" src="/ambi-logo.png" alt="AMBI"/><Bell size={16}/></div>
        <div className="phoneCard active"><small>Next Event</small><b>{upcoming[0]?.title}</b><span>{upcoming[0]?.attending.length} attending · RSVP open</span></div>
        <div className="phoneCard"><small>Latest Approved</small><b>{approved[0]?.title || 'Member announcement'}</b><span>Approved by {approved[0]?.approvedBy || 'Admin'}</span></div>
        <div className="phoneGridMini">{featured.slice(0,4).map(m=><div key={m.id}>{m.initials}</div>)}</div>
      </div>
    </section>

    <section className="homeStatsV10">
      <Stat n="2017" l="BEG Founded"/>
      <Stat n={members.length + '+'} l="Verified Directory Profiles"/>
      <Stat n={sectors.length-1} l="Business Sectors"/>
      <Stat n="1 Admin" l="Can Verify & Approve"/>
    </section>

    <section className="homeGridV10">
      <div className="homeMainColumn">
        <div className="panel homePanelV10">
          <div className="sectionHead"><div><p className="eyebrow">Approved feed</p><h2>Latest announcements, ads & offers</h2></div><button className="ghost" onClick={()=>navigate('Submit')}>Submit <ChevronRight size={16}/></button></div>
          <div className="contentFeed compact">{approved.map(c=><article className="contentCard public spotlightPost" key={c.id}>{c.asset&&<div className="miniAsset"><Paperclip size={15}/>{c.asset.name}</div>}<span className="typePill">{c.type}</span><h3>{c.title}</h3><p>{c.summary}</p><div className="approvalMeta"><BadgeCheck size={15}/> Approved by {c.approvedBy} · {c.approvedAt}</div><small>Submitted by {c.submittedBy} · {c.company}</small></article>)}</div>
        </div>

        <div className="panel homePanelV10">
          <div className="sectionHead"><div><p className="eyebrow">Business sectors</p><h2>Search by what people need</h2></div><button className="ghost" onClick={()=>navigate('Directory')}>All sectors <ChevronRight size={16}/></button></div>
          <div className="sectorStripV10">{topSectors.map(s=><button key={s.id} onClick={()=>navigate('Directory')}><span>{s.icon}</span><b>{s.label}</b><small>{s.count} members</small></button>)}</div>
        </div>
      </div>

      <aside className="homeSideColumn">
        <div className="sideWidgetV10">
          <div className="sectionHead"><div><p className="eyebrow">Upcoming</p><h2>Events</h2></div><CalendarDays className="mutedIcon"/></div>
          {upcoming.map(ev=><button className="eventMiniV10" key={ev.id} onClick={()=>navigate('Reminder')}><b>{ev.day}</b><div><strong>{ev.title}</strong><small>{ev.time} · {ev.location}</small><span>{ev.attending.length} attending</span></div></button>)}
        </div>

        <div className="sideWidgetV10">
          <div className="sectionHead"><div><p className="eyebrow">Featured</p><h2>Members</h2></div><Users className="mutedIcon"/></div>
          {featured.map(m=><button className="memberMiniV10" key={m.id} onClick={()=>navigate('Directory')}><div className="logoMonogram mini">{m.initials}</div><div><b>{m.name}</b><small>{m.company}</small></div><ChevronRight size={15}/></button>)}
        </div>
      </aside>
    </section>

    <section className="panel approvalPreviewV10">
      <div className="sectionHead"><div><p className="eyebrow">Private review area</p><h2>Pending approvals are not public until verified</h2></div><button className="ghost" onClick={()=>navigate('Management')}>Open Management <ChevronRight size={16}/></button></div>
      <div className="cards">{pendingMembers.slice(0,2).map(p=><div className="card" key={p.id}><UserRound className="mutedIcon"/><h3>{p.name}</h3><p>{p.company}</p><span className={`status ${p.status.toLowerCase()}`}>{p.status}</span></div>)}{pending.map(c=><div className="card" key={c.id}><FileText className="mutedIcon"/><h3>{c.title}</h3><p>{c.type}</p><span className="status pending">Pending Review</span></div>)}</div>
    </section>
  </> 
}
function Stat({n,l}) {return <div className="stat"><strong>{n}</strong><span>{l}</span></div>}
function AboutPage(){return <><Hero eyebrow="About BEG" title="Business Excellence Group" desc="Created in 2017 as a collective platform for emerging business establishments, entrepreneurs and professionals across Manipur and beyond."/><section className="panel story"><h2>Built for collaboration, impact and enterprise.</h2><p>BEG brings together first-generation business owners and professionals from manufacturing, hospitality, healthcare, education, e-commerce, retail, automobiles, real estate, construction, IT, finance, FMCG, food and beverage and more.</p><div className="timeline"><b>2017</b><span>BEG Founded</span><b>2020</b><span>COVID humanitarian support</span><b>2026</b><span>AMBI digital member platform</span></div></section><section className="sectorGrid">{sectors.slice(1).map(s=><div className="sectorCard" key={s.id}><span>{s.icon}</span><b>{s.label}</b><small>{s.count} members</small></div>)}</section></>}
function DirectoryPage({sector,setSector,query,setQuery,filteredMembers,setSelectedMember}){return <><Hero eyebrow="Business Directory" title="Find members by sector, name or service." desc="A premium directory with verified business profiles and digital visiting cards."><div className="searchWrap"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search businesses, services, members..."/></div></Hero><section className="sectorGrid">{sectors.map(s=><button className={`sectorCard ${sector===s.id?'selected':''}`} onClick={()=>setSector(s.id)} key={s.id}><span>{s.icon}</span><b>{s.label}</b><small>{s.count} members</small></button>)}</section><section className="memberGrid">{filteredMembers.map(m=><button className="memberCard" onClick={()=>setSelectedMember(m)} key={m.id}><div className="logoMonogram">{m.initials}</div><h3>{m.name}</h3><p>{m.company}</p><span>{sectors.find(s=>s.id===m.sector)?.label}</span><small><BadgeCheck size={14}/> Verified by {m.verifiedBy}</small></button>)}</section></>}
function ProfilePage({member}){return <><section className="profileHero"><div className="cover"><div className="bigLogo">{member.initials}</div></div><div className="profileInfo"><div><p className="eyebrow">Verified Member Profile</p><h1>{member.name}</h1><p>{member.title} · {member.company}</p><span className="verified"><BadgeCheck/> Verified by {member.verifiedBy}</span></div><div className="shareRow"><button><Share2/>Share</button><button><Download/>Card</button></div></div></section><section className="profileGrid"><div className="panel"><h2>About</h2><p>{member.about}</p><h3>Services</h3><div className="chips">{member.services.map(s=><span key={s}>{s}</span>)}</div></div><div className="vcard"><div className="vfront"><div className="logoMonogram">{member.initials}</div><h2>{member.name}</h2><p>{member.company}</p><small>{member.email}</small><small>{member.phone}</small></div><div className="vback"><b>Services</b>{member.services.map(s=><span key={s}>{s}</span>)}<small>Digital visiting card · AMBI</small></div></div></section></>}
function ReminderPage({events,selectedEvent,setSelectedEvent,rsvp,members,setSelectedMember}){
  const days=Array.from({length:35},(_,i)=>i+1);
  const allAttendees=[...selectedEvent.attending,...selectedEvent.maybe,...selectedEvent.not];
  const findMember=(name)=>members.find(m=>m.name===name || name.includes(m.name.split(' ')[0]) || m.name.includes(name.split(' ')[0]));
  const attendingCompanies=selectedEvent.attending.map(n=>findMember(n)?.company).filter(Boolean);
  return <><Hero eyebrow="Event Registration" title="RSVP, see attendees and network before the event." desc="A modern calendar with member-only event registration, visible attendee directory and company participation preview.">
    <div className="eventHeroStats">
      <div><strong>{selectedEvent.attending.length}</strong><span>Attending</span></div>
      <div><strong>{selectedEvent.maybe.length}</strong><span>Maybe</span></div>
      <div><strong>{selectedEvent.not.length}</strong><span>Not attending</span></div>
    </div>
  </Hero>
  <section className="calendarLayout">
    <div className="calendarPanel">
      <div className="calendarTop"><div><p className="eyebrow">June 2026</p><h2>Business Events Calendar</h2></div><button className="primary"><Plus/>Create Event</button></div>
      <div className="weekdays">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><b key={d}>{d}</b>)}</div>
      <div className="monthGrid">{days.map(d=>{const ev=events.find(e=>e.day===d);return <button key={d} className={ev?'hasEvent':''} onClick={()=>ev&&setSelectedEvent(ev)}><span>{d}</span>{ev&&<small>{ev.title}</small>}{ev&&<em>{ev.attending.length} going</em>}</button>})}</div>
    </div>
    <aside className="eventSide">
      <div className="sectionHead"><div><p className="eyebrow">Upcoming</p><h2>Event List</h2></div><Bell className="mutedIcon"/></div>
      {events.map(ev=><button className={selectedEvent.id===ev.id?'eventItem active':'eventItem'} onClick={()=>setSelectedEvent(ev)} key={ev.id}><b>{ev.title}</b><small>{ev.time} · {ev.location}</small><span>{ev.attending.length} attending · {ev.maybe.length} maybe</span></button>)}
      <div className="selectedEvent">
        <p className="eyebrow">Selected Event</p><h3>{selectedEvent.title}</h3>
        <p>{selectedEvent.time} · {selectedEvent.location}</p>
        <small>Created by {selectedEvent.createdBy}</small><small>Approved by {selectedEvent.approvedBy}</small>
        <div className="rsvpBtns"><button onClick={()=>rsvp('attending')}>Attending</button><button onClick={()=>rsvp('maybe')}>Maybe</button><button onClick={()=>rsvp('not')}>Not Attending</button></div>
      </div>
    </aside>
  </section>

  <section className="eventDetailPanel">
    <div className="eventBanner">
      <div><p className="eyebrow">Networking View</p><h2>{selectedEvent.title}</h2><p>Members can see who is coming, discover companies attending and open each member profile before the event.</p></div>
      <div className="eventBadge"><CalendarDays/><b>{selectedEvent.day}</b><span>June</span></div>
    </div>
    <div className="eventStatsGrid">
      <div><strong>{selectedEvent.attending.length}</strong><span>Confirmed Members</span></div>
      <div><strong>{selectedEvent.maybe.length}</strong><span>Maybe / Tentative</span></div>
      <div><strong>{allAttendees.length}</strong><span>Total Responses</span></div>
      <div><strong>{new Set(attendingCompanies).size}</strong><span>Companies Attending</span></div>
    </div>
    <div className="companyStrip">
      <h3>Attending Companies</h3>
      <div className="chips">{attendingCompanies.length ? attendingCompanies.map(c=><span key={c}>{c}</span>) : <span>No companies confirmed yet</span>}</div>
    </div>
    <div className="attendeeColumns">
      <AttendeeGroup title="Attending" list={selectedEvent.attending} members={members} findMember={findMember} setSelectedMember={setSelectedMember}/>
      <AttendeeGroup title="Maybe" list={selectedEvent.maybe} members={members} findMember={findMember} setSelectedMember={setSelectedMember}/>
      <AttendeeGroup title="Not Attending" list={selectedEvent.not} members={members} findMember={findMember} setSelectedMember={setSelectedMember}/>
    </div>
  </section></>}
function AttendeeGroup({title,list,findMember,setSelectedMember}){return <div className="attendeeGroup"><h3>{title} <span>{list.length}</span></h3>{list.length?list.map(name=>{const m=findMember(name);return <button className="attendeeCard" key={name} onClick={()=>m&&setSelectedMember(m)}><div className="logoMonogram mini">{m?.initials || name.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div><b>{name}</b><small>{m?.company || 'Verified AMBI Member'}</small></div><ChevronRight size={16}/></button>}):<p className="emptyState">No members in this list yet.</p>}</div>}
function RsvpList({title,list}){return <div className="rsvpList"><b>{title} ({list.length})</b><p>{list.length?list.join(', '):'No members yet'}</p></div>}
function SignupPage({submitMemberSignup,members}){
  const [form,setForm]=useState({name:'',email:'',phone:'',company:''});
  const [live,setLive]=useState([]);
  const update=(key,value)=>{
    const next={...form,[key]:value};
    setForm(next);
    const text=`${next.name} ${next.email} ${next.company}`.toLowerCase();
    const matches=members.filter(m=>{
      const hay=`${m.name} ${m.company} ${m.email} ${m.services.join(' ')}`.toLowerCase();
      return text.trim().length>3 && text.split(' ').some(x=>x.length>3 && hay.includes(x));
    }).slice(0,3);
    setLive(matches);
  };
  const submit=(e)=>{e.preventDefault();submitMemberSignup(form)};
  return <><Hero eyebrow="Member Access" title="Signup with your real BEG member name." desc="Your Name + Email are used to find the correct Directory profile. Phone is optional. An admin verifies the match before your account becomes active."/>
    <section className="formPanel">
      <form onSubmit={submit}>
        <label>Real Name *<input required value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Same name as BEG directory"/></label>
        <label>Email *<input required type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="name@email.com"/></label>
        <label>Phone optional<input value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="Optional"/></label>
        <label>Company / Business Name<input value={form.company} onChange={e=>update('company',e.target.value)} placeholder="Example: Aadarsh Medicare"/></label>
        <button className="primary"><ShieldCheck/>Submit for admin verification</button>
      </form>
      <div className="panel matchPanel">
        <h2>Directory profile matching</h2>
        <p>The system suggests possible matches, but an admin makes the final link. This avoids wrong accounts using another member profile.</p>
        {live.length>0 ? <div className="matchList">{live.map(m=><div className="matchCard" key={m.id}><div className="logoMonogram mini">{m.initials}</div><div><b>{m.name}</b><span>{m.company}</span><small>{sectors.find(s=>s.id===m.sector)?.label}</small></div></div>)}</div> : <div className="emptyState">Start typing your name, email, or company to preview possible Directory matches.</div>}
        <div className="verifiedBox"><BadgeCheck/> After approval, posts, event creation, RSVP and comments will show your verified real name.</div>
      </div>
    </section></>}

function ManagementPage({pendingMembers,members,contents,approveMember,rejectMember,approveContent,rejectContent,setSelectedMember}){
  const [chosen,setChosen]=useState({});
  const getOptions=(p)=>{
    const candidateIds=p.candidateIds?.length ? p.candidateIds : (p.linkedProfileId ? [p.linkedProfileId] : []);
    const first=candidateIds.map(id=>members.find(m=>m.id===id)).filter(Boolean);
    const rest=members.filter(m=>!candidateIds.includes(m.id));
    return [...first,...rest];
  };
  const pendingContent = contents.filter(c=>c.status==='Pending');
  const reviewedContent = contents.filter(c=>c.status!=='Pending');
  return <><Hero eyebrow="Management Portal" title="Approve members, posts and business content." desc="Any one of the four admins can approve. Approved content becomes public and carries the approving admin name and date."/>
    <section className="panel workflowPanel"><div className="workflowStep"><b>1</b><span>Member submits</span></div><ChevronRight/><div className="workflowStep"><b>2</b><span>Admin verifies</span></div><ChevronRight/><div className="workflowStep"><b>3</b><span>Approved item goes public</span></div></section>
    <section className="panel"><div className="sectionHead"><div><p className="eyebrow">Content approval</p><h2>Pending posts, ads and announcements</h2></div><span className="status pending">{pendingContent.length} pending</span></div><div className="approvalContentGrid">{pendingContent.map(c=><div className="approvalContentCard" key={c.id}><div className="approvalTop"><div className="avatar"><FileText/></div><div><h3>{c.title}</h3><p>{c.type} · {c.visibility}</p></div><span className="status pending">Pending</span></div><p>{c.summary}</p><small>Submitted by {c.submittedBy} · {c.company} · {c.submittedAt}</small><div className="adminActions">{admins.map(a=><button key={a} onClick={()=>approveContent(c.id,a)}><CheckCircle2/>Approve as {a.replace('Admin ','')}</button>)}<button className="reject" onClick={()=>rejectContent(c.id,admins[0])}><XCircle/>Reject</button></div></div>)}</div>{!pendingContent.length && <p className="emptyState">No pending content submissions.</p>}</section>
    <section className="adminGrid">{pendingMembers.map(p=>{
      const options=getOptions(p); const selected=chosen[p.id] ?? p.linkedProfileId ?? options[0]?.id ?? '';
      const linked=members.find(m=>m.id===selected);
      return <div className="approvalCard" key={p.id}>
        <div className="approvalTop"><div className="avatar"><UserRound/></div><div><h3>{p.name}</h3><p>{p.company}</p></div><span className={`status ${p.status.toLowerCase()}`}>{p.status}</span></div>
        <p><Mail size={15}/>{p.email}</p><p><Phone size={15}/>{p.phone}</p><p><Building2 size={15}/>{p.match}</p>
        <div className="linkBox"><label>Link to Directory Profile<select disabled={p.status!=='Pending'} value={selected} onChange={e=>setChosen({...chosen,[p.id]:e.target.value})}>{options.map(m=><option value={m.id} key={m.id}>{m.name} — {m.company}</option>)}</select></label>{linked&&<button className="ghost previewBtn" onClick={()=>setSelectedMember(linked)}><BriefcaseBusiness size={16}/> Preview linked profile</button>}</div>
        {p.verifiedBy&&<div className="verifiedBox"><BadgeCheck/> {p.status} by {p.verifiedBy}<br/><small>{p.verifiedOn}</small><br/><small>Linked: {p.linkedProfileName}</small></div>}
        {p.status==='Pending'&&<div className="adminActions"><div className="adminHint">Approve means: real name verified + account linked to selected Directory profile.</div>{admins.map(a=><button key={a} onClick={()=>approveMember(p.id,a,selected)}><CheckCircle2/>Approve & Link as {a.replace('Admin ','')}</button>)}<button className="reject" onClick={()=>rejectMember(p.id,admins[0])}><XCircle/>Reject</button></div>}
      </div>})}</section>
      <section className="panel"><div className="sectionHead"><div><p className="eyebrow">Reviewed archive</p><h2>Approved / rejected content</h2></div></div><div className="contentFeed compact">{reviewedContent.map(c=><article className={`contentCard ${c.status.toLowerCase()}`} key={c.id}><span className="typePill">{c.type}</span><h3>{c.title}</h3><p>{c.summary}</p><div className="approvalMeta"><BadgeCheck size={15}/> {c.status} by {c.approvedBy} · {c.approvedAt}</div></article>)}</div></section>
      </>}

function SubmitPage({currentUser,submitContent}){
  const [form,setForm]=useState({type:'Announcement',title:'',summary:'',body:'',asset:null});
  const memberName=currentUser?.name || 'Verified Member Demo';
  const handleAsset=(e)=>{
    const file=e.target.files?.[0];
    if(!file) return;
    const allowed=['image/jpeg','image/png','image/webp','application/pdf'];
    if(!allowed.includes(file.type)){
      alert('Please upload JPG, PNG, WEBP or PDF only.');
      e.target.value='';
      return;
    }
    if(file.size > 8 * 1024 * 1024){
      alert('Please keep files under 8MB for the first version.');
      e.target.value='';
      return;
    }
    const asset={name:file.name,type:file.type,size:`${(file.size/1024/1024).toFixed(2)} MB`,preview:file.type.startsWith('image/') ? URL.createObjectURL(file) : ''};
    setForm(prev=>({...prev,asset}));
  };
  const clearAsset=()=>setForm(prev=>({...prev,asset:null}));
  const submit=(e)=>{e.preventDefault();submitContent(form);setForm({type:'Announcement',title:'',summary:'',body:'',asset:null})};
  return <><Hero eyebrow="Member Submission" title="Submit announcements, ads, offers and opportunities." desc="Submitted content stays private until one approved admin reviews it. Once approved, the approving admin is shown on the public card."/>
    <section className="formPanel submitLayout"><form onSubmit={submit}>
      <label>Content Type<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Announcement</option><option>Advertisement</option><option>Business Offer</option><option>News Update</option><option>Event Notice</option><option>Opportunity</option></select></label>
      <label>Title *<input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Example: Member offer for June"/></label>
      <label>Short Summary *<textarea required value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})} placeholder="This appears on the public card after approval."/></label>
      <div className="uploadBlock">
        <div className="uploadHead"><div><p className="eyebrow">Optional visual</p><h3>Upload Poster, Banner, Photo or PDF</h3><small>Place your design, flyer, product photo, ad banner or PDF here for admin review.</small></div><UploadCloud/></div>
        <label className="dropZone"><input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={handleAsset}/><span><UploadCloud/> Choose JPG, PNG, WEBP or PDF</span><small>Recommended after the short summary so admins can review the visual quickly.</small></label>
        {form.asset && <div className="assetPreview">{form.asset.preview ? <img src={form.asset.preview} alt="Uploaded preview"/> : <div className="pdfPreview"><FileText/>PDF</div>}<div><b>{form.asset.name}</b><small>{form.asset.type} · {form.asset.size}</small></div><button type="button" onClick={clearAsset}><Trash2/>Remove</button></div>}
      </div>
      <label>Full Details<textarea value={form.body} onChange={e=>setForm({...form,body:e.target.value})} placeholder="More details for the admin and final article page."/></label>
      <button className="primary"><Plus/>Submit for approval</button>
    </form>
    <aside className="panel"><p className="eyebrow">Submission Rules</p><h2>Verified name attached</h2><p>Your content will be submitted as <b>{memberName}</b>. Phone number is not required. Admin approval controls whether the item appears publicly.</p><div className="verifiedBox"><ShieldCheck/> Pending items are private. Uploaded images/PDFs stay for admin review until approved.</div><div className="contentPreview"><span className="typePill">{form.type}</span><h3>{form.title || 'Your title preview'}</h3><p>{form.summary || 'Your short summary preview will appear here.'}</p>{form.asset && <div className="miniAsset">{form.asset.preview ? <ImageIcon/> : <Paperclip/>}{form.asset.name}</div>}<small>Submitted by {memberName}</small></div></aside></section></>}

function PdfPage({contents}){
  const approved=contents.filter(c=>c.status==='Approved');
  return <><Hero eyebrow="e-PDF Library" title="Approved articles ready to share or download." desc="Only approved member content appears here. Each article keeps its verification details for trust and accountability."/>
  <section className="contentFeed pdfGrid">{approved.map(c=><article className="contentCard pdfCard" key={c.id}><span className="typePill">{c.type}</span><h3>{c.title}</h3><p>{c.summary}</p><div className="approvalMeta"><BadgeCheck size={15}/> Approved by {c.approvedBy}</div><button className="primary"><Download/>Download PDF</button><button className="secondary"><Share2/>Share</button></article>)}</section></>}

function ContactPage(){return <><Hero eyebrow="Contact" title="Connect with AMBI / BEG." desc="For member access, directory correction, business collaboration and event support."/><section className="cards"><div className="card"><Mail/><h3>Email</h3><p>info@ambi-beg.org</p></div><div className="card"><Phone/><h3>Phone</h3><p>Optional member contact</p></div><div className="card"><BriefcaseBusiness/><h3>Office</h3><p>Imphal, Manipur</p></div></section></>}

createRoot(document.getElementById('root')).render(<App/>);
