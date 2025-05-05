/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { format } from 'date-fns';
import { CMDB } from '../types/cmdb.types';

interface CMDBDetailsModalProps {
    entry: CMDB;
    onClose: () => void;
}

const CMDBDetailsModal: React.FC<CMDBDetailsModalProps> = ({ entry, onClose }) => {
    // Parse threat details if they're a string
    const parseThreatDetails = () => {
        if (!entry.threatDetails) return [];

        if (typeof entry.threatDetails === 'string') {
            try {
                // Try to parse as JSON if it looks like JSON
                if (entry.threatDetails.startsWith('[') && entry.threatDetails.endsWith(']')) {
                    return JSON.parse(entry.threatDetails);
                }

                // Otherwise, split by comma
                return entry.threatDetails.split(',').map(item => item.trim());
            } catch (error) {
                console.error('Error parsing threat details:', error);
                return [entry.threatDetails];
            }
        }

        return entry.threatDetails;
    };

    const threatDetails = parseThreatDetails();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>IP Address Details</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className="modal-body">
                    <div className="detail-section">
                        <h3>Basic Information</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">IP Address:</span>
                                <span className="detail-value">{entry.addressIP}</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Address Type:</span>
                                <span className="detail-value">{entry.addressType}</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Organization:</span>
                                <span className="detail-value">{entry.organization || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Geographical Information</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Country:</span>
                                <span className="detail-value">
                                    {entry.country} ({entry.countryCode})
                                </span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Continent:</span>
                                <span className="detail-value">{entry.continentCode}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Usage Information</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Usage Type:</span>
                                <span className="detail-value">{entry.usageType || 'N/A'}</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">First Seen:</span>
                                <span className="detail-value">
                                    {entry.firstSeen ? format(new Date(entry.firstSeen), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}
                                </span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Last Seen:</span>
                                <span className="detail-value">
                                    {entry.lastSeen ? format(new Date(entry.lastSeen), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>
                            Threat Information
                            <span className={`threat-level threat-level-${entry.threatLevel?.toLowerCase()}`}>
                                {entry.threatLevel || 'N/A'}
                            </span>
                        </h3>

                        {threatDetails.length > 0 ? (
                            <div className="threat-details-list">
                                <ul>
                                    {threatDetails.map((detail: any, index: number) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="no-threats">No threat details available</div>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="close-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CMDBDetailsModal;