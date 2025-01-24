// import modules
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; 

// import components
import Tag from './Tag.jsx'

// import assets
import SearchIcon from '../assets/search.svg'
import ArrowIcon from '../assets/arrow-icon.svg'

// import styles
import '../styles/TagSelector.css'

const TagSelector = () => {
    const [tagOptions, setTagOptions] = useState([])

    const [searchValue, setSearchValue] = useState("");    
    const [moreTagHover, setMoreTagHover] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
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
        if (!(selectedTags.find(tag => tag.id === id))) {
            setSelectedTags(prevSelectedTags => 
                [...prevSelectedTags, tagOptions.find(tag => tag.id === id)]
            );
            setTagOptions(prevTagOptions => 
                prevTagOptions.filter(tag => tag.id !== id)
            );
        } else {
            setTagOptions(prevSelectedTags => 
                [...prevSelectedTags, tagOptions.find(tag => tag.id === id)]
            );
            setSelectedTags(prevTagOptions => 
                [prevTagOptions.filter(tag => tag.id !== id)]
            );
        }
    }

    /* set sample list of tag objects */
    useEffect(() => {
        setTagOptions([
            {
                tagName:"python",
                id: uuidv4()
            },
            {
                tagName: "javascript",
                id: uuidv4()
            },
            {
                tagName: "cpp",
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
            }
        ]);
    }, []);

    useEffect(() => {
        console.log(selectedTags);
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
                    {tagOptions && (isCollapsed ? (
                        tagOptions.slice(0, 8).map((tag) =>
                            <Tag 
                                tagName={tag.tagName || "N/A"}
                                onClick={() => {handleTagSelect(tag.id)}}
                            />
                        )
                    ) : (
                        tagOptions.map((tag) =>
                            <Tag 
                                tagName={tag.tagName || "N/A" /* placeholder */}
                            />
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TagSelector;