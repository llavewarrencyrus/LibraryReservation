import React, { useState } from 'react';
import styles from './DonateHero.module.css';

const DonateHero = () => {
    const [activeTab, setActiveTab] = useState('A'); // For tabs

    return (
        <div className={styles.policyContainer}>
            <h2 className={styles.policyTitle}>Donate</h2>
            <p className={styles.policyDescription}>
                <b>Policy Statement on Accepting Donations</b>
                <br />
                The National Library of the Philippines welcomes and appreciates gifts and donations
                from individuals, organizations, and corporations that align with our mission and collection
                development goals. Donated materials contribute to the enrichment and expansion of our
                library resources, enabling us to better serve our library clients.
            </p>
            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'A' ? styles.active : ''}`}
                    onClick={() => setActiveTab('A')}
                >
                    A. Types of Materials/Publications to be accepted
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'B' ? styles.active : ''}`}
                    onClick={() => setActiveTab('B')}
                >
                    B. Types of Materials/Publications not to be accepted
                </button>
            </div>
            <div className={styles.tabContent}>
                {activeTab === 'A' && (
                    <div>
                        <ul>
                            <li>
                                <b>Filipiniana Books:</b> Books printed in the Philippines, about the Philippines,
                                or written by Filipinos on any subject.
                            </li>
                            <li>
                                <b>Research Materials:</b> Materials with research significance that support
                                scholarly pursuits and provide valuable historical or cultural insights.
                            </li>
                            <li>
                                <b>Foreign Books:</b> Published within the last 5-10 years, covering any relevant
                                field or subject.
                            </li>
                            <li>
                                <b>Fiction Books:</b> Bestsellers and classics that offer diverse literary
                                experiences.
                            </li>
                            <li>
                                <b>Children’s Books:</b> Engaging and enriching books for various age groups,
                                provided they are in excellent condition.
                            </li>
                            <li>
                                <b>Magazines and Journals:</b> Published within the last 3-5 years to ensure an
                                up-to-date collection.
                            </li>
                            <li>
                                <b>Non-Print Materials:</b> Maps, globes, DVDs, CD-ROMs, audiobooks, e-books, and
                                similar resources.
                            </li>
                            <li>
                                <b>Special Collections:</b> Manuscripts, pamphlets, memorabilia, and other
                                materials with historical or cultural value.
                            </li>
                        </ul>
                    </div>
                )}
                {activeTab === 'B' && (
                    <div>
                        <ul>
                            <li>
                                <b>Textbooks and Workbooks:</b> Materials designed for classroom use or
                                individual curricula.
                            </li>
                            <li>
                                <b>Dirty, Moldy, or Damaged Materials:</b> Items in poor condition, such as
                                water-damaged or burnt materials.
                            </li>
                            <li>
                                <b>Termite-Infested Materials:</b> Items posing a risk to the library's
                                collection due to pest infestation.
                            </li>
                            <li>
                                <b>Excessive Writing or Markings:</b> Books with excessive highlighting or
                                notes that hinder readability.
                            </li>
                            <li>
                                <b>Outdated Foreign Books/Encyclopedias:</b> Older publications lacking
                                current relevance or value.
                            </li>
                            <li>
                                <b>Used Laboratory Manuals:</b> Materials that are course-specific and less
                                suitable for general library use.
                            </li>
                            <li>
                                <b>Photocopies or Loose-Leaf Publications:</b> Non-original materials not
                                suited for library collections.
                            </li>
                            <li>
                                <b>Out-of-Date Travel Books:</b> Guides with outdated information about
                                destinations.
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonateHero;
