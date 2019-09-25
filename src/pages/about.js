import React from "react";
import {graphql} from "gatsby";
import Image from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import {rhythm} from "../utils/typography";

class AboutPage extends React.Component {
	render() {
		const {data} = this.props;
		const {title, author, social} = data.site.siteMetadata;

		return (
			<Layout location={this.props.location} title={title}>
				<SEO
					title="About"
					description="About page explaining who Itai Steinherz is."
				/>
				<h1
					style={{
						marginTop: rhythm(1.5)
					}}
				>
					About
				</h1>
				<div
					style={{
						marginTop: rhythm(1)
					}}
				>
					<Image
						fixed={data.avatar.childImageSharp.fixed}
						alt={author}
						style={{
							marginRight: rhythm(1 / 2),
							marginBottom: 0,
							maxHeight: 100,
							minWidth: 100,
							maxWidth: 100,
							borderRadius: "100%",
							float: "left"
						}}
						imgStyle={{
							borderRadius: "50%"
						}}
					/>
					{/* eslint-disable react/jsx-child-element-spacing */}
					<p>
						My name is Itai Steinherz, and I&apos;m a software developer from Israel, as well as a high-school and university student. I&apos;ve been developing software for nearly 7 years, ranging from CLIs and desktop apps to full-stack mobile and backend apps. In my spare time, I like to hang out with my friends and play the piano.
					</p>
					<p>
						I&apos;ve been contributing to and maintaining <a href="https://en.wikipedia.org/wiki/Open-source_software">OSS</a> projects for the last 4 years, and love collaborating with cool and smart people from all around the world.
						<br/>
						One of the more popular projects I maintain (along with the awesome Sindre Sorhus and Sam Verschueren) is <a href="https://github.com/sindresorhus/np"><code>np</code></a>, which is a CLI for Node.js developers that simplifies your entire publishing workflow to a single command, and includes many best practices and useful features built-in. I usually triage issues, review PRs and contribute to different parts of the codebase, while continuously working with others and maintaing a high level of code quality and architecture standards.
						<br/>
						I also made other cool projects such as <a href="https://github.com/itaisteinherz/videos"><code>videos</code></a> and <a href="https://github.com/itaisteinherz/MChat">MChat</a>.
					</p>
					<p>
						I recently participated in a <a href="https://chingu.io">Chingu</a> voyage, which is coding cohort that connects developers from all around the world and enables them to collaborate and work on products together. At my voyage, I lead a team of 5 developers from the US, Greece, Italy, and Israel. Together, we developed <a href="http://github.com/chingu-voyage7/Bears-Team-22">Knowledge</a>, an online platform for asking questions and getting answers. During the voyage I learned a lot about leading a team of developers, working around deadlines, quickly iterating over ideas, and collaborating with people coming from different backgrounds and places.
					</p>
					<p>
						I always seek complex architecture challenges, and love utilizing modern approaches such as Serverless applications, Infrastructure as Code and CI/CD in my work.
					</p>
					<p>
						Apart from high-level programming, I also have experience with low-level programming using C and Assembly, and like to fiddle with information security and play CTFs.
					</p>
					<p>
						If you&apos;d like to contact me, feel free to do so via <a href={`mailto:${social.email}`}>email</a> or <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>.
					</p>
					{/* eslint-enable react/jsx-child-element-spacing */}
				</div>
			</Layout>
		);
	}
}

export default AboutPage;

export const pageQuery = graphql`
    query {
	avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
            childImageSharp {
                fixed(width: 400, height: 400) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        site {
            siteMetadata {
                title
				author
				social {
					twitter
					email
				}
            }
        }
    }
`;
