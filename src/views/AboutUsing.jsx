import React, { useEffect, useRef } from 'react';
import Header from '../conponents/Header';
import collaborationImg from "../imgs/about1.jpeg";
import Productivity from "../imgs/Productivity.jpeg";
import accountability from "../imgs/accountability.jpeg";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../conponents/Footer';

const AboutUsing = () => {
  const benefitRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    benefitRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ref,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

   
   
  }, []);

  return (
    <>
      <Header active="about" />
      <div className="bg-gray-100 min-h-screen mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-gray-800">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-600 mt-20">Why Use a Collaborative Todo List?</h1>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
              <p className="text-lg leading-relaxed bg-gray-100 p-5 rounded-xl shadow-md">
                In today’s fast-paced world, staying organized and efficient is key to personal and professional success.
                Collaborative todo lists offer a powerful tool to manage tasks, projects, and goals efficiently, especially
                in collaborative environments.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Benefits of Using a Collaborative Todo List</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Benefit 1: Enhanced Team Coordination */}
                <div ref={el => benefitRefs.current[0] = el} className="benefit-card bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={collaborationImg}
                    alt="Enhanced Team Coordination"
                    className="benefit-image h-64 w-full object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">Enhanced Team Coordination</h3>
                    <p className="text-lg leading-relaxed">
                      Real-time Updates: Collaborative todo lists allow team members to see updates and changes instantly,
                      fostering better coordination and reducing communication gaps.
                    </p>
                  </div>
                </div>

                {/* Benefit 2: Improved Accountability */}
                <div ref={el => benefitRefs.current[1] = el} className="benefit-card bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={Productivity}
                    alt="Improved Accountability"
                    className="benefit-image h-64 w-full object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">Improved Accountability</h3>
                    <p className="text-lg leading-relaxed">
                      Assigned Tasks: Assign tasks to specific team members, clarifying responsibilities and accountability.
                      Track Progress: Monitor task completion and milestones, providing visibility into individual and team
                      progress.
                    </p>
                  </div>
                </div>

                {/* Benefit 3: Increased Productivity */}
                <div ref={el => benefitRefs.current[2] = el} className="benefit-card bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={accountability}
                    alt="Increased Productivity"
                    className="benefit-image h-64 w-full object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">Increased Productivity</h3>
                    <p className="text-lg leading-relaxed">
                      Focus on Priorities: Prioritize tasks and deadlines, helping team members focus on what matters most.
                      Efficient Resource Allocation: Allocate resources effectively by seeing who is working on what and when
                      tasks are due.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gray-100 drop-shadow-lg p-5 rounded-xl mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">How to Use a Collaborative Todo List Effectively</h2>
              <ul className="list-disc list-inside text-lg">
                <li className="mb-4">
                  <strong>Set Clear Goals and Priorities:</strong> Define clear objectives and priorities for your projects
                  or tasks. Break down larger goals into actionable steps that team members can easily understand and
                  execute.
                </li>
                <li className="mb-4">
                  <strong>Assign Responsibilities:</strong> Assign tasks to team members based on their strengths and
                  expertise. Use tags or labels to categorize tasks by project, urgency, or department.
                </li>
                <li className="mb-4">
                  <strong>Communicate Effectively:</strong> Use comments or notes within the todo list to provide context,
                  updates, or additional instructions. Encourage open communication among team members to resolve queries or
                  discuss task details.
                </li>
                <li className="mb-4">
                  <strong>Regularly Review and Update:</strong> Schedule regular check-ins to review progress, address
                  obstacles, and adjust timelines if necessary. Update task statuses and priorities as projects evolve or
                  deadlines change.
                </li>
              </ul>
            </section>

            <section className="bg-gray-100 drop-shadow-lg p-5 rounded-xl mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Conclusion</h2>
              <p className="text-lg leading-relaxed mb-6">
                In conclusion, collaborative todo lists are indispensable tools for teams looking to streamline workflows,
                enhance communication, and achieve collective goals efficiently. By leveraging the benefits of collaborative
                task management, teams can foster a culture of productivity, accountability, and success.
              </p>
              <p className="text-lg leading-relaxed">
                Ready to get started? Explore our collaborative todo list tools and start optimizing your team’s productivity
                today! Whether you're managing a small team or coordinating a large-scale project, our intuitive platforms
                are designed to empower your team to achieve more.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AboutUsing;
