import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu, X, Home, Info, Building2, Mail, Bell, Plus, FileText, Share2, Copy, CheckCircle2, Clock, Users, ShieldCheck, Download, Search, ChevronRight, ArrowLeft, Phone, MapPin, Globe2 } from 'lucide-react';
import './styles.css';

const owners = [
  {
    id: 'mira-handloom',
    name: 'Mira Ningombam',
    role: 'Founder',
    business: 'Mira Handloom Studio',
    logo: 'MH',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=80',
    category: 'Handloom & Design',
    contact: '+91 98765 43210',
    email: 'hello@mirahandloom.in',
    address: 'Paona Bazaar, Imphal',
    website: 'www.mirahandloom.in',
    about: 'A contemporary textile studio preserving traditional weaving while creating modern home and fashion pieces for everyday use.',
    services: ['Custom handloom orders', 'Traditional textiles', 'Home decor pieces', 'Design consultation'],
    cardMessage: 'Crafted with heritage, made for modern homes.'
  },
  {
    id: 'north-east-cafe',
    name: 'Ronit Sapam',
    role: 'Owner',
    business: 'North East Cafe Co.',
    logo: 'NE',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80',
    category: 'Cafe & Food',
    contact: '+91 91234 56789',
    email: 'visit@necafe.co',
    address: 'Thangmeiband, Imphal',
    website: 'www.necafe.co',
    about: 'A calm neighborhood cafe serving locally inspired drinks, farm-style plates, and small creative events for the community.',
    services: ['Specialty coffee', 'Private bookings', 'Event catering', 'Community pop-ups'],
    cardMessage: 'Coffee, culture, and conversations.'
  },
  {
    id: 'avit-solutions',
    name: 'Sony Sapam',
    role: 'Systems Designer',
    business: 'AviT Solutions',
    logo: 'Ai',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=640&q=80',
    category: 'AV & IT Solutions',
    contact: '+91 99887 77665',
    email: 'connect@avitsolutions.tech',
    address: 'Imphal, Manipur',
    website: 'www.avitsolutions.tech',
    about: 'Integrated audiovisual, IT, UI/UX, and custom software solutions for modern businesses, classrooms, cafes, and enterprise spaces.',
    services: ['AV system design', 'Web & app development', 'ERP custom builds', 'UI/UX prototyping'],
    cardMessage: 'Structural integrity in the body, the network, and the code.'
  }
];

const initialSubmissions = [
  { id: 1, title: 'Local Business Networking Evening', type: 'Event', by: 'Mira Handloom Studio', status: 'Pending', approvals: ['Admin A', 'Admin B'], needed: 4 },
  { id: 2, title: 'Cafe Culture Article: New Farm Cafes', type: 'Article', by: 'North East Cafe Co.', status: 'Pending', approvals: ['Admin A'], needed: 4 },
  { id: 3, title: 'Digital Visiting Card Feature Guide', type: 'Guide', by: 'AviT Solutions', status: 'Approved', approvals: ['Admin A', 'Admin B', 'Admin C', 'Admin D'], needed: 4 }
];

const initialEvents = [
  {
    id: 1,
    title: 'Community Business Meetup',
    date: 'Saturday, 20 June 2026',
    time: '4:00 PM - 6:00 PM',
    location: 'Town Hall, Imphal',
    createdBy: 'Directory Admin',
    description: 'A simple networking meetup for business owners, creators, and service providers.',
    rsvp: {
      attending: ['Mira', 'Ronit', 'Sony', 'Asha'],
      maybe: ['Daniel', 'Ibotombi'],
      notAttending: ['Rita']
    }
  },
  {
    id: 2,
    title: 'e-PDF Article Sharing Workshop',
    date: 'Sunday, 28 June 2026',
    time: '11:00 AM - 12:30 PM',
    location: 'Online + Community Hub',
    createdBy: 'Content Team',
    description: 'Learn how to create, download, and share readable community articles as PDFs.',
    rsvp: {
      attending: ['Sony', 'Rita'],
      maybe: ['Mira', 'Asha', 'Daniel'],
      notAttending: []
    }
  }
];

function App() {
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(owners[0]);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [events, setEvents] = useState(initialEvents);
  const [toast, setToast] = useState('');

  const publicApproved = submissions.filter(s => s.status === 'Approved');
  const pending = submissions.filter(s => s.status === 'Pending');

  const navTo = (target) => { setPage(target); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const openOwner = (owner) => { setSelectedOwner(owner); navTo('profile'); };
  const showToast = (message) => { setToast(message); setTimeout(() => setToast(''), 2200); };

  const approveSubmission = (id) => {
    setSubmissions(items => items.map(item => {
      if (item.id !== id || item.status !== 'Pending') return item;
      const nextApprovals = item.approvals.length >= item.needed ? item.approvals : [...item.approvals, `Admin ${String.fromCharCode(65 + item.approvals.length)}`];
      return { ...item, approvals: nextApprovals, status: nextApprovals.length >= item.needed ? 'Approved' : 'Pending' };
    }));
  };

  const rejectSubmission = (id) => setSubmissions(items => items.map(item => item.id === id ? { ...item, status: 'Rejected' } : item));

  const addSubmission = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get('title')?.toString().trim();
    const type = form.get('type')?.toString();
    if (!title) return;
    setSubmissions(items => [{ id: Date.now(), title, type, by: form.get('by') || 'Community Member', status: 'Pending', approvals: [], needed: 4 }, ...items]);
    e.currentTarget.reset();
    showToast('Submitted for four-admin approval. Not live yet.');
    navTo('admin');
  };

  const updateRSVP = (eventId, status) => {
    const user = 'You';
    setEvents(items => items.map(event => {
      if (event.id !== eventId) return event;
      const cleaned = {
        attending: event.rsvp.attending.filter(n => n !== user),
        maybe: event.rsvp.maybe.filter(n => n !== user),
        notAttending: event.rsvp.notAttending.filter(n => n !== user)
      };
      cleaned[status] = [user, ...cleaned[status]];
      return { ...event, rsvp: cleaned };
    }));
    showToast('RSVP updated.');
  };

  const pages = useMemo(() => ({
    home: <HomePage pending={pending} publicApproved={publicApproved} navTo={navTo} openOwner={openOwner} />,
    about: <AboutPage />,
    directory: <DirectoryPage openOwner={openOwner} />,
    profile: <ProfilePage owner={selectedOwner} showToast={showToast} />,
    contact: <ContactPage />,
    reminder: <ReminderPage events={events} updateRSVP={updateRSVP} />,
    submit: <SubmitPage addSubmission={addSubmission} />,
    admin: <AdminPage submissions={submissions} approveSubmission={approveSubmission} rejectSubmission={rejectSubmission} />,
    pdf: <PdfPage showToast={showToast} />
  }), [page, pending, publicApproved, selectedOwner, submissions, events]);

  return <div className="appShell">
    <header className="topbar">
      <button className="iconButton" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={26}/></button>
      <button className="brand" onClick={() => navTo('home')}><span className="brandMark">C</span><span>CommunityHub</span></button>
      <nav className="topnav" aria-label="Main navigation">
        <button onClick={() => navTo('home')}>Home</button>
        <button onClick={() => navTo('about')}>About</button>
        <button onClick={() => navTo('directory')}>Directory</button>
        <button onClick={() => navTo('contact')}>Contact</button>
      </nav>
    </header>

    {menuOpen && <aside className="drawer" aria-label="Side menu">
      <div className="drawerPanel">
        <div className="drawerTop"><strong>Menu</strong><button className="iconButton" onClick={() => setMenuOpen(false)}><X /></button></div>
        <button onClick={() => navTo('home')}><Home /> Home</button>
        <button onClick={() => navTo('about')}><Info /> About</button>
        <button onClick={() => navTo('directory')}><Building2 /> Directory</button>
        <button onClick={() => navTo('reminder')}><Bell /> Reminder + RSVP</button>
        <button onClick={() => navTo('submit')}><Plus /> Submit Content</button>
        <button onClick={() => navTo('admin')}><ShieldCheck /> Admin Approval</button>
        <button onClick={() => navTo('pdf')}><FileText /> e-PDF Articles</button>
        <button onClick={() => navTo('contact')}><Mail /> Contact</button>
      </div>
    </aside>}

    <main>{pages[page]}</main>

    <footer className="bottomNav" aria-label="Footer actions">
      <button onClick={() => navTo('reminder')}><Bell /><span>Reminder</span></button>
      <button className="plusAction" onClick={() => navTo('submit')}><Plus /><span>Submit</span></button>
      <button onClick={() => navTo('pdf')}><FileText /><span>e-PDF</span></button>
    </footer>

    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}

function HomePage({ pending, publicApproved, navTo, openOwner }) {
  return <section className="page">
    <div className="hero gridTwo">
      <div>
        <p className="eyebrow">Accessible community platform</p>
        <h1>Business directory, reminders, approvals, and shareable articles in one clean platform.</h1>
        <p className="lead">Designed for all generations, from 18 to 80, with strong contrast, clear navigation, and mobile-app-ready structure.</p>
        <div className="heroActions"><button className="primary" onClick={() => navTo('directory')}>Explore Directory</button><button className="secondary" onClick={() => navTo('submit')}>Submit Content</button></div>
      </div>
      <div className="heroCard">
        <div className="statusRow"><ShieldCheck /><strong>Four-admin verification</strong></div>
        <p>Pending submissions are visible for review, but they do not become public until approval is complete.</p>
        <div className="progressStack">{pending.slice(0,2).map(item => <SubmissionMini key={item.id} item={item} />)}</div>
      </div>
    </div>
    <SectionHeader title="Pending Submissions Awaiting Approval" subtitle="Admin-facing preview only. Not public until verified." />
    <div className="cardGrid">{pending.map(item => <SubmissionMini key={item.id} item={item} />)}</div>
    <SectionHeader title="Live Approved Content" subtitle="Only approved items appear publicly." />
    <div className="cardGrid">{publicApproved.map(item => <article className="card" key={item.id}><CheckCircle2 className="good"/><h3>{item.title}</h3><p>{item.type} by {item.by}</p><span className="pill approved">Live</span></article>)}</div>
    <SectionHeader title="Featured Business Owners" subtitle="Tap a card to open the profile and digital visiting card." />
    <div className="ownerGrid">{owners.map(owner => <OwnerCard key={owner.id} owner={owner} onClick={() => openOwner(owner)} />)}</div>
  </section>
}

function AboutPage(){return <section className="page narrow"><p className="eyebrow">About</p><h1>Built for community clarity.</h1><p className="lead">This platform combines directory listings, event reminders, RSVP coordination, content submission, approval workflow, and shareable e-PDF articles in one simple interface.</p><div className="featureList"><Feature icon={<Users/>} title="All-age usability" text="Readable text, strong contrast, large buttons, and predictable navigation."/><Feature icon={<ShieldCheck/>} title="Controlled publishing" text="Submissions stay pending until admins verify them."/><Feature icon={<Globe2/>} title="Future app ready" text="Mobile-first layouts and reusable sections make Android/iOS expansion easier."/></div></section>}
function DirectoryPage({ openOwner }){return <section className="page"><div className="searchHeader"><div><p className="eyebrow">Directory</p><h1>Professional business profiles</h1></div><div className="searchBox"><Search size={20}/><span>Search coming soon</span></div></div><div className="ownerGrid">{owners.map(owner => <OwnerCard key={owner.id} owner={owner} onClick={() => openOwner(owner)} />)}</div></section>}
function ProfilePage({ owner, showToast }){return <section className="page"><button className="textButton" onClick={() => history.back()}><ArrowLeft size={18}/> Back</button><div className="profileHero"><img src={owner.photo} alt={owner.name}/><div><p className="eyebrow">{owner.category}</p><h1>{owner.name}</h1><p className="lead">{owner.role}, {owner.business}</p><p>{owner.about}</p><div className="shareRow"><button onClick={() => showToast('Profile link copied') }><Copy/> Copy Link</button><button><Share2/> WhatsApp</button><button>Instagram</button><button>Facebook</button><button>LinkedIn</button><button>TikTok</button></div></div></div><SectionHeader title="Digital Visiting Card" subtitle="Front and back card layout for sharing."/><div className="visitCards"><div className="visitCard front"><div className="logoBig">{owner.logo}</div><h2>{owner.name}</h2><p>{owner.business}</p><p><Phone size={16}/> {owner.contact}</p><p><Mail size={16}/> {owner.email}</p><p><MapPin size={16}/> {owner.address}</p><p><Globe2 size={16}/> {owner.website}</p></div><div className="visitCard back"><h2>Services Offered</h2>{owner.services.map(service => <p key={service}>• {service}</p>)}<strong>{owner.cardMessage}</strong></div></div></section>}
function ContactPage(){return <section className="page narrow"><p className="eyebrow">Contact</p><h1>Contact the platform team</h1><p className="lead">Use this page later for enquiry forms, admin support, directory onboarding, and business-owner verification.</p><form className="form"><input placeholder="Your name"/><input placeholder="Email or phone"/><textarea placeholder="Message"/><button className="primary" type="button">Send Message</button></form></section>}
function ReminderPage({ events, updateRSVP }){return <section className="page"><p className="eyebrow">Reminder + RSVP</p><h1>Coordinate events smoothly</h1><p className="lead">People can mark Attending, Maybe, or Not Attending and see grouped attendee lists.</p><div className="eventStack">{events.map(event => <article className="eventCard" key={event.id}><div className="eventTop"><div><h2>{event.title}</h2><p><Clock size={16}/> {event.date} · {event.time}</p><p><MapPin size={16}/> {event.location}</p><p>Created by {event.createdBy}</p></div><div className="rsvpSummary"><strong>{event.rsvp.attending.length}</strong><span>Attending</span></div></div><p>{event.description}</p><div className="rsvpButtons"><button onClick={() => updateRSVP(event.id,'attending')}>Attending</button><button onClick={() => updateRSVP(event.id,'maybe')}>Maybe</button><button onClick={() => updateRSVP(event.id,'notAttending')}>Not Attending</button></div><div className="rsvpGroups"><AttendeeGroup title="Attending" people={event.rsvp.attending}/><AttendeeGroup title="Maybe" people={event.rsvp.maybe}/><AttendeeGroup title="Not Attending" people={event.rsvp.notAttending}/></div></article>)}</div></section>}
function SubmitPage({ addSubmission }){return <section className="page narrow"><p className="eyebrow">Submit Content</p><h1>Send content for approval</h1><p className="lead">Submitted content enters pending review and will not go live until four-admin approval is complete.</p><form className="form" onSubmit={addSubmission}><input name="title" placeholder="Submission title" required/><select name="type"><option>Article</option><option>Event</option><option>Business Update</option><option>Guide</option></select><input name="by" placeholder="Submitted by"/><textarea placeholder="Short content summary"/><button className="primary" type="submit">Submit for Approval</button></form></section>}
function AdminPage({ submissions, approveSubmission, rejectSubmission }){return <section className="page"><p className="eyebrow">Admin Dashboard</p><h1>Four-admin approval workflow</h1><div className="tableLike">{submissions.map(item => <article className="approvalRow" key={item.id}><div><h3>{item.title}</h3><p>{item.type} · submitted by {item.by}</p><p>{item.approvals.length}/{item.needed} approvals</p></div><span className={`pill ${item.status.toLowerCase()}`}>{item.status}</span><div className="rowActions"><button onClick={() => approveSubmission(item.id)}>Approve</button><button onClick={() => rejectSubmission(item.id)}>Reject</button></div></article>)}</div></section>}
function PdfPage({ showToast }){return <section className="page narrow"><p className="eyebrow">Article / e-PDF</p><h1>Downloadable shareable article</h1><article className="pdfPreview"><h2>Community Business Guide</h2><p>This clean article layout is prepared for future PDF generation. It uses readable spacing, large type, and simple sections for easy sharing.</p><p>In a backend version, this page can generate real PDFs from approved articles only.</p></article><button className="primary" onClick={() => { window.print(); showToast('Use Print → Save as PDF'); }}><Download/> Download / Save as PDF</button></section>}
function SectionHeader({title, subtitle}){return <div className="sectionHeader"><h2>{title}</h2><p>{subtitle}</p></div>}
function SubmissionMini({ item }){return <article className="card"><Clock className="warn"/><h3>{item.title}</h3><p>{item.type} by {item.by}</p><div className="approvalBar"><span style={{width:`${(item.approvals.length / item.needed) * 100}%`}} /></div><p>{item.approvals.length}/{item.needed} admin approvals</p><span className="pill pending">Pending Review</span></article>}
function OwnerCard({ owner, onClick }){return <button className="ownerCard" onClick={onClick}><img src={owner.photo} alt={owner.name}/><div><span className="logoSmall">{owner.logo}</span><h3>{owner.name}</h3><p>{owner.business}</p><small>{owner.category}</small></div><ChevronRight/></button>}
function Feature({icon,title,text}){return <article className="feature">{icon}<h3>{title}</h3><p>{text}</p></article>}
function AttendeeGroup({title, people}){return <div className="attendeeGroup"><strong>{title} ({people.length})</strong><p>{people.length ? people.join(', ') : 'No one yet'}</p></div>}

createRoot(document.getElementById('root')).render(<App/>);
