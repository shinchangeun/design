

###global Modernizr:true ###
'use strict'

(($) ->
  $.fn.extend
    mgPgnation: (options) ->
      $this = $(this)

      if $this.length
        $mainNav = @children()
        $pgnNav = $this.find('.pgn__item')
        $curNav = $this.find('.current')
        $magicNav = $this.find('a')
        $prevNav = $this.find('.prev')
        $nextNav = $this.find('.next')
        $prevNavText = $prevNav.find('.pgn__prev-txt')

        ### func :: update prev text ###
        updatePrevText = ->
          $prevNavText = $prevNav.find('.pgn__prev-txt')
          $prevNavText.html 'Prev'

        ### func :: calculate width of each page num ###
        calPgnWidth = ->
          # number of visible <a> plus <strong class="current">
          vsbNav = $this.find('.pgn__item a:visible').length + 1
          vsbNavs = vsbNav + 2
          prevWidth = 100 / vsbNavs
          pgnWidth = 100 - prevWidth * 2
          $prevNav.css 'width', prevWidth + '%'
          $nextNav.css 'width', prevWidth + '%'
          $pgnNav.css 'width', pgnWidth + '%'
          # <a> and <strong>
          $pgnNav.find('a, strong').css 'width', 100 / vsbNav + '%'

        ### func :: calculate and display prev/next ###
        # 85px - display full text
        showPrevNext = ->
          prevNavWidth = $prevNav.innerWidth()

          if prevNavWidth > 100
            $this.addClass 'fullprevnext'

            # display Previous
            $prevNavText.html 'Previous'
          else if prevNavWidth < 101 and prevNavWidth > 60
            $this.addClass 'fullprevnext'

            # display Prev
            $prevNavText.html 'Prev'
          else
            $this.removeClass 'fullprevnext'

        ### func :: draw magic line ###
        magicDraw = ->
          # draw init magic line
          $magicLine.width($curNav.width())
          if $curNav.position() != undefined
            $magicLine.css 'left', $curNav.position().left
          
          # assign orig values
          $magicLine.data 'origLeft', $magicLine.position().left
          $magicLine.data 'origWidth', $magicLine.width()
        # END funcs
        
        # create magic line
        $mainNav.append('<li class="pgn__magic-line">')
        
        # declare magic line
        $magicLine = $this.find('.pgn__magic-line')

        # add extra class & element if no prev or next
        prevNavWidth = $prevNav.innerWidth()

        if prevNavWidth > 100
          prevText = 'Previous'
        else
          prevText = 'Prev'

        if !$prevNav.children().length
          $prevNav.addClass 'disabled'
          $prevNav.append '<a rel="prev"><i class="pgn__prev-icon icon-angle-left"></i><span class="pgn__prev-txt">' + prevText + '</span></a>'

        if !$nextNav.children().length
          $nextNav.addClass 'disabled'
          $nextNav.append '<a rel="next"><i class="pgn__next-icon icon-angle-right"></i><span class="pgn__next-txt">Next</span></a>'

        # calculate pgn width
        calPgnWidth()

        # show prev/next
        showPrevNext()

        # draw magic line
        magicDraw()
        
        # when hover
        $magicNav.hover (->
          $el = $(this)
          leftPos = $el.position().left
          newWidth = $el.width()
          
          # animate magic line
          $magicLine.stop().animate
            left: leftPos
            width: newWidth
        ), ->
          $magicLine.stop().animate
            left: $magicLine.data('origLeft')
            width: $magicLine.data('origWidth')
      
        ### Window Resize Changes ###
        window.addEventListener 'resize', ->
          updatePrevText()
          calPgnWidth()
          showPrevNext()
          magicDraw()
  # END mgPgnation()
      
  # call function here 
  $('.pgn').mgPgnation()

) jQuery

