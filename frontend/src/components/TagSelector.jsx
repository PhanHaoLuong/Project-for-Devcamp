// import modules
import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from 'uuid';
import * as configs from '../configs.json';

// import components
import Tag from './Tag.jsx'

// import assets
import SearchIcon from '../assets/search.svg'
import ArrowIcon from '../assets/arrow-icon.svg'

// import styles
import '../styles/TagSelector.css'

const TagSelector = ({ 
    onConfirm,
    setVisible,
    getSelectedTags, 
    getTagOptions, 
    currSelectedTags,
    currTagOptions
}) => {
    const [tagOptions, setTagOptions] = useState([]);

    const [searchValue, setSearchValue] = useState("");    
    const [moreTagHover, setMoreTagHover] = useState(false);
    const [selectedTags, setSelectedTags] = useState(currSelectedTags || []);
    const [isCollapsed, setCollapsed] = useState(true);

    const searchRef = useRef(null);
    const moreTagRef = useRef(null);
    const tagBoxRef = useRef(null);
    const selectorRef = useRef(null);

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    }

    const handleTagSelect = (id) => {
        const selected = selectedTags.find(tag => tag?.id === id);
        const unselected = tagOptions.find(tag => tag?.id === id);
        if (unselected) {
            setSelectedTags(prevSelectedTags => 
                [unselected, ...prevSelectedTags]
            );
            setTagOptions(prevTagOptions => 
                prevTagOptions.filter(tag => tag !== unselected)
            );
        } else if (selected) {
            setTagOptions(prevTagOptions => 
                [selected, ...prevTagOptions]
            );
            setSelectedTags(prevTagOptions => 
                prevTagOptions.filter(tag => tag !== selected)
            );
        }
    }
    
    // sample data
    const sampleData = [
        {
            tagName:"python",
            id: uuidv4()
        },
        {
            tagName: "javascript",
            id: uuidv4()
        },
        {
            tagName: "c#",
            id: uuidv4()
        },
        {
            tagName: "rust",
            id: uuidv4()
        },
        {
            tagName: "java",
            id: uuidv4()
        },
        {
            tagName: "go",
            id: uuidv4()
        },
        {
            tagName: "c++",
            id: uuidv4()
        },
        {
            tagName: "c",
            id: uuidv4()
        },
        {
            tagName: "matlab",
            id: uuidv4()
        },
        {
            tagName: "carbon",
            id: uuidv4()
        },
        {
            tagName: "go",
            id: uuidv4()
        },
        {
            tagName: "typescript",
            id: uuidv4()
        },
        {
            tagName: "ruby",
            id: uuidv4()
        },
        {
            tagName: "php",
            id: uuidv4()
        },
        {
            tagName: "swift",
            id: uuidv4()
        },
        {
            tagName: "kotlin",
            id: uuidv4()
        },
        {
            tagName: "scala",
            id: uuidv4()
        },
        {
            tagName: "elixir",
            id: uuidv4()
        }
    ]

    const handleSearchTag = (searchValue) => {
        const escapedSearchValue = searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const matchPattern = new RegExp(escapedSearchValue, 'i');
        return sampleData.filter(tag => matchPattern.test(tag.tagName));
    };

    useEffect(() => {
        const unselectedTags = sampleData.filter(
            tag => !selectedTags.some(selected => selected.tagName === tag.tagName)
        );
        const result = searchValue ? (
            handleSearchTag(searchValue).filter(
                tag => !selectedTags.some(selected => selected.tagName === tag.tagName)
            )
        ) : (
            unselectedTags
        );
        setTagOptions(result);
    }, [searchValue, selectedTags]);

    /* set sample list of tag objects */
    useEffect(() => {
        if (currSelectedTags.length) {
            setSelectedTags(currSelectedTags);
            setTagOptions(currTagOptions)       
        } else {
            setSelectedTags([]);
            setTagOptions(sampleData);
        }
    }, [])

    useEffect(() => {
        if (!isCollapsed && tagBoxRef.current) {
            tagBoxRef.current.style.height = 'auto';
            tagBoxRef.current.style.height = (tagBoxRef.current.scrollHeight + 15) + 'px'
        } else {
            tagBoxRef.current.style.height = '';
        }

        if (selectorRef.current){
            selectorRef.current.style.height = "auto";
            selectorRef.current.style.height = tagBoxRef.current.style.height + 'px';
        }
    }, [isCollapsed])

    const useClickOutside = (ref, callback) => {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback();
                }
            }
    
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref, callback]);
    }
    
    useClickOutside(selectorRef, () => setVisible())

    return (
        <div className={`tag-selector ${isCollapsed ? "collapsed" : "expanded"}`}
            ref={selectorRef}
        >
            <div className="tag-search">
                <input className="tag-search-input"
                    ref={searchRef}
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                <img className="tag-search-icon"
                    onClick={() => {
                        if (searchRef.current) {
                            searchRef.current.focus();
                        }
                    }}
                    src={SearchIcon}
                    alt="S"
                />
            </div>
            <div className="selected-tag">
                <p className="selected-tag-header">
                    <p className="selected-tag-text">
                        selected tags
                    </p>
                    <p className="selected-tag-limit">
                        {`${selectedTags.length}/8`}
                    </p>
                </p>
                <div className="selected-tag-box">
                    {!selectedTags.length ? "no tag selected." : (
                        <>
                        {selectedTags.map((tag) => 
                            <Tag tagName={tag.tagName || "N/a"}
                                onClick={() => {
                                    handleTagSelect(tag.id)
                                }}
                            />
                        )}
                        </>
                    )}
                </div>
            </div>
            <div className="tag-collapsible-selector">
                <div className="tag-collapsible-selector-bar"
                    onClick={() => {
                        if (moreTagRef.current) {
                            moreTagRef.current.click();
                        }
                    }}
                    onMouseEnter={() => {
                        setMoreTagHover(true);
                    }}
                    onMouseLeave={() => {
                        setMoreTagHover(false);
                    }}
                >
                    <div className="collapsible-selector-text">
                        tags
                    </div>
                    <button className={`more-tag ${!isCollapsed ? "expanded" : ""} ${moreTagHover ? "hover" : ""}`}
                        onClick={() => {
                            setCollapsed(!isCollapsed);
                        }}
                        ref={moreTagRef}
                    >
                        {!isCollapsed ? "less tag" : "more tag"}
                    </button>
                </div>
                <div className={`tag-box ${isCollapsed ? "collapsed" : "expanded"}`}
                    ref={tagBoxRef}
                    style={{
                        "transition": "all 0.2s ease-in-out"
                    }}
                >
                    {tagOptions.length ? (isCollapsed ? (
                        tagOptions.slice(0, 8).map((tag) =>
                            <Tag 
                                tagName={tag?.tagName || "N/A"}
                                onClick={() => {
                                    if (selectedTags.length < configs.tagsLimit) handleTagSelect(tag.id);
                                }}
                            />
                        )
                    ) : (
                        tagOptions.map((tag) =>
                            <Tag 
                                tagName={tag?.tagName || "N/A"}
                                onClick={() => {
                                    if (selectedTags.length < configs.tagsLimit) handleTagSelect(tag.id);
                                }}
                            />
                        )
                    )) : "no tags available."}
                </div>
            </div>
            <div className="confirm-button-container">
                <button className="confirm-button"
                    onClick={() => {
                        onConfirm();
                        getSelectedTags(selectedTags);
                        getTagOptions(tagOptions);
                    }}
                >
                    confirm
                </button>
            </div>
        </div>
    );
}

export default TagSelector;